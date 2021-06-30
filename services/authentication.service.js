const AuthTokenGenerator=require("../modules/authTokens");
const TeacherService=require("../services/teacher.services");
const bcrypt=require("../modules/bcrypt");
module.exports={
    getTeacherAuthToken(teacherEmailId,teacherPassword){
        return new Promise((resolve,reject)=>{
            if(!teacherEmailId||!teacherPassword){
                reject({
                    message:"invalid credentials",
                    statusCode:401,
                    trace:"No trace available"
                })
            }
            TeacherService.findTeacherByEmail(teacherEmailId)
                .then(teacherDetails=>{
                    bcrypt.compareHash(teacherPassword,teacherDetails.password)
                        .then(()=>{
                            AuthTokenGenerator.tokenGenerateForTeacher({
                                id:teacherDetails._id,
                                createdAt:new Date(),
                            })
                                .then(token=>{
                                    resolve(token);
                                }).catch(err=>{
                                reject({
                                    message:"unable to generate token",
                                    statusCode:403,
                                    trace:err
                                })
                            })
                        })
                        .catch((e)=>{
                            reject({
                                statusCode:401,
                                message:"Invalid credentials",
                                trace:e
                            })
                        });
                })
                .catch(err=>{
                    reject({
                        statusCode:401,
                        message:"Invalid credentials",
                        trace:err
                    })
                })
        })
    }
};