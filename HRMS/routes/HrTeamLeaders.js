const router=require("express").Router();
const Auth=require("../controllers/AuthenticationAndAuthorizationController").Controller;
// Uncomment next line to check authorization
// router.use(Auth.verifyLoginForHrTeamLeader);
module.exports=router;