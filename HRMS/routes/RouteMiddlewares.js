/*
*
* This file is used declare routes middleware
*
*/

/*
*
* Function to check if the user trying to access is HrAdvisor or not
*
*/
const ROLES=require("../modules/authTokens").ROLES;

module.exports.HrAdvisorAuthValidator=(req,res,next)=>{
    const authToken=req.headers.authorization;
    if(!authToken)
    {
        return res.send("Unauthorised").status(401);
    }
    // check if the required token is available in the authorization field of HTTP headers
    // along with the required role ROLES.HR_ADVISOR
    console.log(req.headers);
    next();

};

module.exports.HrTeamMemberAuthValidator=(req,res,next)=>{
    const authToken=req.headers.authorization;
    if(!authToken)
    {
        return res.send("Unauthorised").status(401);
    }
    // check if the required token is available in the authorization field of HTTP headers
    // along with the required role ROLES.HR_TEAM_MEMBER
    console.log(req.headers);
    next();

};

module.exports.HrTeamLeaderAuthValidator=(req,res,next)=>{
    const authToken=req.headers.authorization;
    if(!authToken)
    {
        return res.send("Unauthorised").status(401);
    }
    // check if the required token is available in the authorization field of HTTP headers
    // along with the required role ROLES.HR_TEAM_LEADER
    console.log(req.headers);
    next();

};