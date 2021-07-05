const bcrypt=require("../modules/bcrypt");
const AdminService=require("./admin.users.service");
const AuthTokenGenerator=require("../modules/authTokens");
module.exports={
    getAdminAuthToken(email,password){
        return new Promise((resolve,reject)=>{
            AdminService.getAdminUsingEmail(email)
                .then((admin)=>{
                    bcrypt.compareHash(password,admin.password)
                        .then(()=>{
                            AuthTokenGenerator.tokenGenerateForAdmin({
                                id:admin._id,
                                email:admin.email
                            })
                                .then((token)=>resolve(token))
                                .catch((err)=>{
                                    reject({
                                        message:"unable to generate token",
                                        statusCode:503,
                                        trace:err
                                    })
                                })
                        }).catch((err)=>{
                        reject({
                            message:"unable to verify password",
                            statusCode:503,
                            trace:err
                        })
                    })
                }).catch((err)=>{
                reject({
                    message:"unable to find admin",
                    statusCode:503,
                    trace:err
                })
            })
        })
    }
};