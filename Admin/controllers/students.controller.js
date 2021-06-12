const StudentsServices = require("../services/students.service");

module.exports = {
  async addNewStudent(req, res) {
    try {
      const student = await StudentsServices.addNewStudent(req.body);
      return res.status(202).send(student);
    } catch (e) {
      res.status(400).send(e);
    }
  },
  async getAllStudentsAndTheirCourseDetails(req, res) {
    try {
      const studentCourses =
        await StudentsServices.getAllStudentsAndTheirCourseDetails();
      return res.status(202).send(studentCourses);
    } catch (e) {
      res.status(400).send(e);
    }
  },
  async updateStudentCourseDetailsByStudentId(req, res) {
    try {
      const studentUpdatedCourse =
        await StudentsServices.updateStudentCourseDetailsByStudentId(
          req.params.id,
          req.body
        );
      return res.status(202).send(studentUpdatedCourse);
    } catch (e) {
      res.status(400).send(e);
    }
  },

  async getAllStudents(req, res) {
    try {
      const students = await StudentsServices.getAllStudents();
      return res.status(202).send(students);
    } catch (e) {
      res.status(400).send(e);
    }
  },
};
