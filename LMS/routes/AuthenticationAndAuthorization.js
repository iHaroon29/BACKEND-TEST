const express = require("express");
const router = express.Router();

const AuthenticationConroller = require("../../controllers/authentication.controller");

router.post("/student/login", AuthenticationConroller.studentLogin);

router.post("/teacher/login", AuthenticationConroller.teacherLogin);

module.exports = router;
