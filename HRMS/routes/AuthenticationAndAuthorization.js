var express = require('express');
var router = express.Router();
const AuthController=require("../controllers/AuthenticationAndAuthorizationController").Controller;

router.post('/login', AuthController.makeLogin);
router.post('/logout', AuthController.logout);
router.post('/login/details', AuthController.getLoggedInUserDetails);



module.exports = router;
