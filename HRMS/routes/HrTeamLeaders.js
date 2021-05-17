const router=require("express").Router();
const Auth=require("../controllers/AuthenticationAndAuthorizationController").Controller;
const HrTeamLeaderController = require('../controllers/HrTeamLeaderController');
// Uncomment next line to check authorization
// router.use(Auth.verifyLoginForHrTeamLeader);

router.post('/', HrTeamLeaderController.createNewRoomForHr)
module.exports=router;