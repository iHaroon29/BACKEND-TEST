const OTP=require("../models/otp.model");
const DAOError=require("../errors/dao.errors").getDAOErrorMessage;
module.exports={
    createNewOtp(token,role){
        let otp="";
        for(let i=0;i<4;i++){
            otp+=Math.floor(Math.random()*9);
        }
        return new Promise((resolve,reject)=>{
            new OTP({token:token,otp:otp,role:role})
                .save()
                .then(()=>{
                    resolve(otp)
                }).catch((err)=>{
                reject(DAOError("unable to save otp",503,err))
            })
        })
    },
    verifyOTP(token,otp,role){
        return new Promise((resolve,reject)=>{
            OTP.findOneAndDelete({token:token,otp:otp})
                .then(otpDetails=>{
                    if(!otpDetails){
                        reject("invalid otp")
                    }
                    resolve(otp)
                }).catch((err)=>{
                reject(DAOError("unable to verify otp",503,err))
            })
        })
    },
};