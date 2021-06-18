const express = require("express");
const router = express.Router();
// const Student = require("../../models/mongodb/students");
// const Teacher = require("../../models/mongodb/teachers");
// const AuthToken = require("../../modules/authTokens");
// const LoginActivity = require("../../models/mongodb/logInActiviity");
// const bcrypt = require("../../modules/bcrypt");
const AuthenticationConroller = require("../../controllers/authentication.controller");

// router.post("/login/student", async (req, res) => {
//   //    return auth token on correct details of the student
//   const student = await Student.findOne({ email: req.body.email });
//   //if employee not found
//   if (!student) return res.status(401).send("invalid username or password");

//   const studentPassword = student.password;
//   // match password
//   bcrypt
//     .compareHash(req.body.password, studentPassword)
//     .then((passwordMatched) => {
//       const role = student.role;
//       if (role !== "STUDENT") {
//         return res.send("Unauthorized").status(401);
//       }
//       AuthToken.generateToken({ id: student._id }, role)
//         .then((token) => {
//           console.log(token);
//           const LoginActivityData = {
//             user_type: token.role,
//             user_id: student._id,
//             activity: { token: token.token },
//             has_logged_out: false,
//           };
//           // saving login
//           new LoginActivity(LoginActivityData)
//             .save()
//             .then((r) => {
//               console.log("new user logged in ", r);
//             })
//             .catch(() => {});
//           return res.send(token).status(202);
//         })
//         .catch((unableToGenerateAuthToken) => {
//           return res.send("unable to make you login please try again later");
//         });
//     })
//     .catch((invalidPassword) => {
//       return res.send("invalid username or password").status(401);
//     });
// });

// router.post("/login/teacher", async (req, res) => {
//   //    return auth token on correct details of the student
//   const teacher = await Teacher.findOne({ email: req.body.email });
//   //if employee not found
//   if (!teacher) return res.status(401).send("invalid username or password");

//   const teacherPassword = teacher.password;
//   // match password
//   bcrypt
//     .compareHash(req.body.password, teacherPassword)
//     .then((passwordMatched) => {
//       const role = teacher.role;
//       if (role !== "TEACHER") {
//         return res.send("Unauthorized").status(401);
//       }
//       AuthToken.generateToken({ id: teacher._id }, role)
//         .then((token) => {
//           const LoginActivityData = {
//             user_type: token.role,
//             user_id: teacher._id,
//             activity: { token: token.token },
//             has_logged_out: false,
//           };
//           // saving login
//           new LoginActivity(LoginActivityData)
//             .save()
//             .then((r) => {
//               console.log("new user logged in ", r);
//             })
//             .catch(() => {});
//           return res.send(token).status(202);
//         })
//         .catch((unableToGenerateAuthToken) => {
//           return res.send("unable to make you login please try again later");
//         });
//     })
//     .catch((invalidPassword) => {
//       return res.send("invalid username or password").status(401);
//     });
// });
router.post("/login/student", AuthenticationConroller.studentLogin);

router.post("/login/teacher", AuthenticationConroller.teacherLogin);

module.exports = router;
