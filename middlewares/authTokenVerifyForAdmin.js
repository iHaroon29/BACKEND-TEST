const AuthTokenService=require("../modules/authTokens");
const AdminService=require("../services/admin.users.service");
module.exports=(req,res,next)=>{
    const authToken=req.headers.authorization;
    AuthTokenService.verifyTokenForAdmin(authToken)
        .then(decodedToken=>{
            req.user=decodedToken.token_details;
            req.user.role=decodedToken.role;
            AdminService.getAdminDetailsById(decodedToken.token_details.id)
                .then((adminDetails)=>{
                    if(!adminDetails){
                        return res.sendStatus(401);
                    }
                    req.user.details=adminDetails;
                    next();
                }).catch(err=>{
                return res.sendStatus(401);
            })

        })
        .catch(err=> {
            return res.sendStatus(401);
        })
};
