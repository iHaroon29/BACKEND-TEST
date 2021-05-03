const HrApplicant=require("../models/mongodb/newHrApplicants");
const newHrApplicantValidation=require("../routes/DataValidators").NewHrApplicant;
const bcrypt=require("../modules/bcrypt");

const responseErrorFormat={
    status:"",
    trace:""
};


module.exports={
    addNewHrApplicant(details){
        return new Promise((resolve, reject) => {
            newHrApplicantValidation(details)
                .then(validData=>{
                    bcrypt.genHash(validData.password)
                        .then(hashedPassword=>{
                            validData.password=hashedPassword;
                            new HrApplicant(validData).save()
                                .then((saved)=>{
                                    resolve(saved);
                                })
                                .catch((unsaved)=>{
                                    responseErrorFormat.status="unable to register";
                                    responseErrorFormat.trace=unsaved;
                                    reject(responseErrorFormat);
                                })
                        })
                        .catch((errorOnPasswordHashing)=>{
                            responseErrorFormat.status="unable to encrypt password";
                            responseErrorFormat.trace=errorOnPasswordHashing;
                            reject(responseErrorFormat);
                        })

                })
                .catch(invalidData=>{
                    responseErrorFormat.status="invalid data";
                    responseErrorFormat.trace=invalidData.details;
                    reject(responseErrorFormat)
                })
        })
    }
};