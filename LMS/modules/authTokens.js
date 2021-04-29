const jwt=require("jsonwebtoken");
const TOKEN_EXPIRATION_IN_SECONDS=20*60;
const ALGORITHM="HS256";
const env=require("dotenv");
env.config();

const ROLES={
    student:"DIGITAL_AIDED_SCHOOL_LMS_STUDENT",
    teacher:"DIGITAL_AIDED_SCHOOL_LMS_TEACHER"

};


const SECRET=process.env.TOKEN_SECRET || "SECRET";

module.exports.generateToken=(data,role)=>{
    return new Promise((resolve, reject) =>
    {
        if(!data || !role){
            reject("data and role both are required");
        }
        if(!ROLES[role]) {
            reject("Not valid role");
        }

        jwt.sign({data:{
                user_name:data,
                role:role
            }},SECRET,{
            expiresIn: TOKEN_EXPIRATION_IN_SECONDS,
            algorithm:ALGORITHM
        },(err,decode)=>{
            if(decode)
                resolve(decode);
            else
                reject(err);
        })
    });
};
module.exports.verifyToken=(token, requiredRole)=>{
    return new Promise(((resolve, reject) => {
        if(!token || !requiredRole)
            reject("token and requiredRole both are required fields.");
        jwt.verify(token,SECRET,{},(err,decoded)=>{
            if(decoded)
            {
                console.log(decoded);
                resolve(decoded);
            }else {
                if(err.name==="TokenExpiredError"){
                    reject("Token expired");
                }
                reject(err);
            }
        });
    }))
};
module.exports.roles=ROLES;



module.exports.tokenGenerateForTeacher=(data)=> {
    new Promise((resolve, reject) => {
        generateToken(data,ROLES.teacher)
            .then((data)=>{
                resolve(data);
            })
            .catch((err)=>{
                reject(err);
            })
    })
};
module.exports.tokenGenerateForStudent=(data)=> {
    new Promise((resolve, reject) => {
        generateToken(data,ROLES.student)
            .then((data)=>{
                resolve(data);
            })
            .catch((err)=>{
                reject(err);
            })
    })
};