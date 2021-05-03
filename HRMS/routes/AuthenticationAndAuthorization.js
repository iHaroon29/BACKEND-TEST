var express = require('express');
var router = express.Router();
const HrController=require("../controllers/HrController");


router.post('/login/hr/advisor', function(req, res) {
//    return auth token on correct details of the HR advisor
    const ROLE=authTokens.ROLES.HR_ADVISOR; // role to be assigned in the token

});
router.post('/login/hr/team/member', function(req, res) {
//    return auth token on correct details of the HR Team member
    const ROLE=authTokens.ROLES.HR_TEAM_MEMBER; // role to be assigned in the token

});

router.post('/login/hr/team/leader', function(req, res) {
//    return auth token on correct details of the HR team Leader
    const ROLE=authTokens.ROLES.HR_TEAM_LEADER; // role to be assigned in the token

});


router.post('/login/hr/test', function(req, res) {
    HrController.login(req.body)
        .then((token)=>{
            return res.send(token).status(202);
        })
        .catch((err)=>{
            return res.send(err).status(400);
        })

});


module.exports = router;
