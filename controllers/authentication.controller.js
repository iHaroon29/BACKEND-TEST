const StudentAuthenticationService = require("../services/students.authentication.service");
const TeacherAuthenticationService = require("../services/teachers.authentication.service");
const AdminAuthenticationService = require("../services/admins.authentication.service");
const AuthenticationService=require("../services/authentication.service");

module.exports = {
  async studentLogin(req, res) {
    try {
      const studentToken = await StudentAuthenticationService.studentLogin(
        req.body
      );
      return res.status(200).send(studentToken);
    } catch (e) {
      console.log(e);
      return res.status(400).send(e);
    }
  },
  adminLogin() {},
  async teacherLogin(req, res) {
    try {
      const teacherToken = await AuthenticationService.getTeacherAuthToken(req.body.email,req.body.password);
      return res.status(200).send(teacherToken);
    } catch (e) {
      console.log(e);
      return res.status(e.statusCode).send(e.message);
    }
  },
};
