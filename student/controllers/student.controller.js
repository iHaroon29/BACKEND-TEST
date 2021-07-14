const StudentsServices = require("../../services/students.service");
const StudentAuthenticationService = require("../../services/students.authentication.service");
const TokenHandler=require("../../modules/tokenHandler");

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

   async getTokenDetails(req, res) {
    try {
      const teacherToken = await TokenHandler.decodeToken(req.headers.authorization);
      return res.status(200).send(teacherToken);
    } catch (e) {
      return res.status(e.statusCode||503).send(e);
    }
  },

  async updateStudentPersonalDetailsById(req, res) {
    try {
      const updatedStudent =
        await StudentsServices.updateStudentPersonalDetailsById(
          req.params.id,
          req.body
        );
      return res.status(202).send(updatedStudent);
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async getStudentPersonalDetailById(req, res) {
    try {
      const studentDetails = await StudentsServices.getStudentPersonalDetailById(
        req.params.id
      );
      return res.status(202).send(studentDetails);
    } catch (e) {
      res.status(400).send(e);
    }
  },
};
