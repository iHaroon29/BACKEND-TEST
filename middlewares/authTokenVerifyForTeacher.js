const AuthToken=require("../modules/authTokens");
const Teacher=require("../models/teachers.model");
module.exports=(req,res,next)=>{
    if(req.path.startsWith("/teacher/update/password/")|| req.path==="/teacher/forgot/password"){
        return next();
    }
    const token=req.headers.authorization;
    if(!token){
        return res.sendStatus(401);
    }
    AuthToken.verifyTokenForTeacher(token)
        .then(validToken=>{
            req.user=validToken.token_details;
            Teacher.findById(validToken.token_details.id)
                .then(teacherDetails=>{
                    if(!teacherDetails){
                        return res.sendStatus(401);
                    }
                    req.user.details=teacherDetails;
                    next();
                })
        }).catch(()=>{
        return res.sendStatus(401);
    });
};