var express = require('express');
var router = express.Router();
const AuthController=require("../controllers/AuthenticationAndAuthorizationController").Controller;

router.post('/login', AuthController.makeLogin);
router.post('/logout', AuthController.logout);
router.get('/login/details', AuthController.getLoggedInUserDetails);
router.get('/login/verify/employee', AuthController.verifyLoginForEmployee);



module.exports = router;
