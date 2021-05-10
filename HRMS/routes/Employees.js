const router=require("express").Router();
const Auth=require("../controllers/AuthenticationAndAuthorizationController").Controller;
// Uncomment next line to check authorization
//router.use(Auth.verifyLoginForEmployee);

router.get("/",(req,res)=>{
    return res.send("OK").status(200);

});

module.exports=router;