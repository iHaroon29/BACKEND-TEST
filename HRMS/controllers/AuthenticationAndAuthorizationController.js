const Employee=require("../models/mongodb/employees");
const AuthToken=require("../modules/authTokens");
const bcrypt=require("../modules/bcrypt");
const LoginSchema=require("../routes/DataValidators").MakeLogin;
const LoginActivity=require("../models/mongodb/logInActiviity");

const ROLES={
    EMPLOYEE:"DIGITAL_AIDED_SCHOOL_HRMS_EMPLOYEE",
    HR_ADVISOR:"DIGITAL_AIDED_SCHOOL_HRMS_TEAM_ADVISOR",
    LMS_TEACHER:"DIGITAL_AIDED_SCHOOL_HRMS_TEAM_ADVISOR",
    HR_TEAM_LEADER:"DIGITAL_AIDED_SCHOOL_HRMS_TEAM_LEADER",
    NEW_HR_APPLICANT:"DIGITAL_AIDED_SCHOOL_HRMS_NEW_HR_APPLICANT",
};
module.exports.ALLOWED_ROLES=ROLES;


class AuthenticationAndAuthorizationController{
    makeLogin(req,res){
        LoginSchema(req.body)
            .then((validLoginData)=>{
                Employee.findOne({email:validLoginData.username})
                    .then(employee=>{
                        //if employee not found
                        if(!employee)
                            return res.send("invalid username or password").status(401);
                        const employeePassword=employee.password;
                        // match password
                        bcrypt.compareHash(validLoginData.password,employeePassword)
                            .then((passwordMatched)=>{
                                // generate auth token
                                AuthToken.generateToken({},employee.role)
                                    .then((token)=>{
                                        const LoginActivityData={
                                            user_type:"employee",
                                            user_id:employee._id,
                                            activity:{token:token},
                                            has_logged_out:false,
                                        };
                                        // saving login
                                        new LoginActivity(LoginActivityData).save().then(r => {
                                            console.log("new user logged in ",r)
                                        }).catch(()=>{
                                        });
                                        return res.send(token).status(202);
                                    }).catch((unableToGenerateAuthToken)=>{
                                    return res.send("unable to make you login please try again later");
                                })
                            }).catch((invalidPassword)=>{
                            return res.send("invalid username or password").status(401);
                        })
                    }).catch((errorInFindingEmployee)=>{
                    return res.send("unable to find employee").status(500);
                })
            }).catch(invalidLoginDetails=>{
            return res.send("please provide username and password").status(406); // 406--> Not acceptable
        })
    }
    logout(req,res){
        const token=req.headers.authorization;
        AuthToken.verifyToken(token)
            .then((decodedToken)=>{
                LoginActivity.findOne({"activity.token":token, has_logged_out:false})
                    .then((employee)=>{
                        if(!employee)
                            return res.status(401);
                        LoginActivity.updateOne({_id:employee._id})
                            .then(updatedValue=>{
                                return res.send("logged out successfully").status(202);
                            }).catch((errorInUpdation)=>{
                            console.log(errorInUpdation);
                            return res.send("unable to logout").status(500);
                        })
                    })
            }).catch((invalidToken)=>{
            return res.status(401);
        })
    }
    getLoggedInUserDetails(req,res){
        AuthToken.verifyToken(req.headers.authorization)
            .then((decodedData)=>{
                req.body.authenticatedUser=decodedData;
                return res.send(decodedData).status(200);
            }).catch(errorInDecoding=>{
            return res.send("unable to verify login").status(500);
        })
    }
}
const Controller=new AuthenticationAndAuthorizationController();
module.exports.Controller=Controller;