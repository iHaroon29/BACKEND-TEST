const AuthTokenService=require("../modules/authTokens");
module.exports=(req,res,next)=>{
    const authToken=req.headers.authorization;
    AuthTokenService.verifyTokenForAdmin(authToken)
        .then(decodedToken=>{
            req.user=decodedToken.token_details;
            req.user.role=decodedToken.role;
            next();
        })
        .catch(err=> {
            return res.sendStatus(401);
        })
};
