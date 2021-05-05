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


const verifyToken=(token, requiredRole)=>{
    return new Promise(((resolve, reject) => {
        if(!token || !requiredRole)
            reject({
                message:"token and requiredRole both are required fields."
            });
        jwt.verify(token,SECRET,{},(err,decoded)=>{
            if(decoded)
            {
                console.log(decoded);
                // verify if the required role is present or not
                if(decoded.role===requiredRole)
                    resolve(decoded);
                reject({
                    message:"not required role"
                })
            }else {
                if(err.name==="TokenExpiredError"){
                    reject({
                        message:"Token expired"
                    });
                }
                reject({
                    message:"unable to verify tokens",
                    stack:err
                });
            }
        });
    }))
};


//===========================================================================

module.exports.tokenGenerateForHrTeamMember=(data)=> {
    return generateToken(data, "HR_TEAM_MEMBER");
};
module.exports.tokenGenerateForHrTeamLeader=(data)=> {
    return generateToken(data,"HR_TEAM_LEADER");
};
module.exports.tokenGenerateForHrAdvisor=(data)=> {
    return generateToken(data,"HR_ADVISOR")
};
//===========================================================================


module.exports.verifyTokenForHrTeamMember=(data)=> {
    return verifyToken(data, "HR_TEAM_MEMBER");
};
module.exports.verifyTokenForHrTeamLeader=(data)=> {
    return verifyToken(data,"HR_TEAM_LEADER");
};
module.exports.verifyTokenForHrAdvisor=(data)=> {
    return verifyToken(data,"HR_ADVISOR")
};

//===========================================================================