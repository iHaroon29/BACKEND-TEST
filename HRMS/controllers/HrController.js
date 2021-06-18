const Hr=require("../../models/employees.model");
const NewHrValidation=require("../routes/DataValidators").NewHr;
const bcrypt=require("../../modules/bcrypt");
const {Login}=require("../routes/DataValidators");
const tokenGenerate=require("../../modules/authTokens");



// =====================================================================



const responseErrorFormat={
    status:"",
    trace:""
};
module.exports={
    // function to register a new HR
    addNewHr(details) {
        return new Promise((resolve, reject) => {
            NewHrValidation(details)
                .then(validData => {
                    bcrypt.genHash(validData.password)
                        .then(hashedPassword => {
                            validData.password = hashedPassword;
                            new Hr(validData).save()
                                .then((saved) => {
                                    resolve(saved);
                                })
                                .catch((unsaved) => {
                                    responseErrorFormat.status = "unable to register";
                                    responseErrorFormat.trace = unsaved;
                                    reject(responseErrorFormat);
                                })
                        })
                        .catch((errorOnPasswordHashing) => {
                            responseErrorFormat.status = "unable to encrypt password";
                            responseErrorFormat.trace = errorOnPasswordHashing;
                            reject(responseErrorFormat);
                        })

                })
                .catch(invalidData => {
                    responseErrorFormat.status = "invalid data";
                    responseErrorFormat.trace = invalidData.details;
                    reject(responseErrorFormat)
                })

        })
    },
    login(details){
        return new Promise((resolve, reject) => {
            Login(details)
                .then((validData)=>{
                    Hr.findOne({email:validData.email})
                        .then((hr)=>{
                            if(!hr){
                                console.log("No user found");
                                reject("invalid Username or password")
                            }
                            bcrypt.compareHash(validData.password,hr.password)
                                .then((status)=>{
                                    tokenGenerate.tokenGenerateForHrAdvisor({
                                        id:hr._id
                                    })
                                        .then(token=>{
                                            resolve(token);
                                        })
                                        .catch(unableToGenerateToken=>{
                                            responseErrorFormat.trace=unableToGenerateToken;
                                            responseErrorFormat.status="Unable to generate token";
                                          reject(responseErrorFormat)
                                        })
                                })
                                .catch(textsMatchFail=>{
                                    console.log("password doesn't match");
                                    reject("invalid Username or password")
                                })

                        })
                        .catch(mongooseFindOneError=>{
                            responseErrorFormat.trace=mongooseFindOneError;
                            responseErrorFormat.status="Unable to find User";
                            reject(responseErrorFormat)
                        });
                })
                .catch(invalidData=>{
                    responseErrorFormat.trace=invalidData;
                    responseErrorFormat.status="Invalid data";
                    reject(responseErrorFormat)
                })
        })

    }
};