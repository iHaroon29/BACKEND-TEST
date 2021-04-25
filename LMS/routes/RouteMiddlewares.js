/*
*
* This file is used declare routes middleware
*
*/

/*
*
* Function to check if the user trying to access is Admin or not
*
*/
module.exports.AdminAuthValidator=(req,res,next)=>{
    const authToken=req.headers.authorization;
    if(!authToken)
    {
        return res.send("Unauthorised").status(401);
    }
    //check if the required token is available in the authorization field of HTTP headers
    console.log(req.headers);
    next();

};