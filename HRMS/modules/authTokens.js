const jwt=require("jsonwebtoken");
const TOKEN_EXPIRATION_IN_SECONDS=20*60;
const ALGORITHM="HS256";
const env=require("dotenv");
env.config();

const ROLES={
    HR_TEAM_MEMBER:"DIGITAL_AIDED_SCHOOL_HRMS_TEAM_MEMBER",
    HR_ADVISOR:"DIGITAL_AIDED_SCHOOL_HRMS_TEAM_ADVISOR",
    HR_TEAM_LEADER:"DIGITAL_AIDED_SCHOOL_HRMS_TEAM_LEADER",
    NEW_HR_APPLICANT:"DIGITAL_AIDED_SCHOOL_HRMS_NEW_HR_APPLICANT",
};
module.exports.ROLES=ROLES;
const SECRET=process.env.TOKEN_SECRET || "SECRET";

const generateToken=(data,role)=>{
    return new Promise((resolve, reject) =>
    {
        if(!data || !role){
            reject("data and role both are required");
        }
        if(!ROLES[role]) {
            reject("Not valid role");
        }

        jwt.sign({data:{
                token_details:data,
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




module.exports.tokenGenerateForHrTeamMember=(data)=> {
    new Promise((resolve, reject) => {
        generateToken(data,"HR_TEAM_MEMBER")
            .then((data)=>{
                resolve(data);
            })
            .catch((err)=>{
                reject(err);
            })
    })
};
module.exports.tokenGenerateForHrTeamLeader=(data)=> {
    new Promise((resolve, reject) => {
        generateToken(data,"HR_TEAM_LEADER")
            .then((data)=>{
                resolve(data);
            })
            .catch((err)=>{
                reject(err);
            })
    })
};
module.exports.tokenGenerateForHrAdvisor=(data)=> {
        return generateToken(data,"HR_ADVISOR")
};