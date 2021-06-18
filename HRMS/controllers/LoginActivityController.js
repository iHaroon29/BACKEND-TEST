const LoginActivity=require("../../models/login.activity.model");
const LoginActivityValidator=require("../routes/DataValidators").NewLoginActivity;

const rejectResponse={
    message:"",
    trace:"",
};

module.exports={
    addNewLoginActivity(data){
        return new Promise((resolve, reject) => {
            LoginActivityValidator(data)
                .then(validData=>{
                    new LoginActivity(validData).save()
                        .then((saved)=>{
                            resolve(saved);
                        })
                        .catch(err=>{
                            reject(err);
                        })
                })
                .catch(invalidData=>{
                    rejectResponse.message="invalid data";
                    rejectResponse.trace=invalidData;
                    reject(rejectResponse);
                })
        })
    },
    logout(data){
    //    TODO mark hasLoggedOut in DB to true

    }




};