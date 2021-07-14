const AuthToken=require("../modules/authTokens");
const Student=require("../models/students.model");
module.exports=(req,res,next)=>{
    if(req.path.startsWith("/student/update/password/")|| req.path==="/student/forgot/password"){
        return next();
    }
    const token=req.headers.authorization;
    if(!token){
        return res.sendStatus(401);
    }
    AuthToken.verifyTokenForStudent(token)
        .then(validToken=>{
            req.user=validToken.token_details;
            Student.findById(validToken.token_details.id)
                .then(studentDetails=>{
                    if(!studentDetails){
                        return res.sendStatus(401);
                    }
                    req.user.details=studentDetails;
                    next();
                })
        }).catch(()=>{
        return res.sendStatus(401);
    });
};