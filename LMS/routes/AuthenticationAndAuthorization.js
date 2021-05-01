const express = require('express');
const router = express.Router();
const authTokens=require("../modules/authTokens");
const validator=require("./DataValidators");

router.post('/login/student', function(req, res) {
//    return auth token on correct details of the student

});
router.post('/login/teacher', function(req, res) {
//    return auth token on correct details of the student

});

module.exports = router;
