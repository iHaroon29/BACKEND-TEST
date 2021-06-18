const express = require("express");
const router = express.Router();
<<<<<<< HEAD

const AuthenticationConroller = require("../../controllers/authentication.controller");
=======
const Student = require("../../models/students.model");
const Teacher = require("../../models/teachers.model");
const AuthToken = require("../../modules/authTokens");
const LoginActivity = require("../../models/login.activity.model");
const bcrypt = require("../../modules/bcrypt");

router.post("/student/login", async (req, res) => {
  //    return auth token on correct details of the student
  const student = await Student.findOne({ email: req.body.email });
  //if employee not found
  if (!student) return res.status(401).send("invalid username or password");
>>>>>>> f43ad2c2b0887318b7a9b172deab9c5401c54818

router.post("/student/login", AuthenticationConroller.studentLogin);

<<<<<<< HEAD
router.post("/teacher/login", AuthenticationConroller.teacherLogin);
=======
router.post("/teacher/login", async (req, res) => {
  //    return auth token on correct details of the student
  const teacher = await Teacher.findOne({ email: req.body.email });
  //if employee not found
  if (!teacher) return res.status(401).send("invalid username or password");

  const teacherPassword = teacher.password;
  // match password
  bcrypt
    .compareHash(req.body.password, teacherPassword)
    .then((passwordMatched) => {
      const role = teacher.role;
      if (role !== "TEACHER") {
        return res.send("Unauthorized").status(401);
      }
      AuthToken.generateToken({ id: teacher._id }, role)
        .then((token) => {
          const LoginActivityData = {
            user_type: token.role,
            user_id: teacher._id,
            activity: { token: token.token },
            has_logged_out: false,
          };
          // saving login
          new LoginActivity(LoginActivityData)
            .save()
            .then((r) => {
              console.log("new user logged in ", r);
            })
            .catch(() => {});
          return res.send(token).status(202);
        })
        .catch((unableToGenerateAuthToken) => {
          return res.send("unable to make you login please try again later");
        });
    })
    .catch((invalidPassword) => {
      return res.send("invalid username or password").status(401);
    });
});
>>>>>>> f43ad2c2b0887318b7a9b172deab9c5401c54818

module.exports = router;
