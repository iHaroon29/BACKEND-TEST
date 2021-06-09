const TeachersServices = require("../services/teacher.services");

module.exports = {
  async addNewTeacher(req, res) {
    try {
      const teacher = await TeachersServices.addNewTeacher(req.body);
      return res.status(202).send(teacher);
    } catch (e) {
      res.status(400).send(e);
    }
  },
  async getAllTeachersAndPersonalDetails(req, res) {
    try {
      const allTeachers =
        await TeachersServices.getAllTeachersAndPersonalDetails();
      return res.status(200).send(allTeachers);
    } catch (e) {
      return res.sendStatus(400);
    }
  },
  async deleteTeacherById(req, res) {
    try {
      const deletedTeacher = await TeachersServices.deleteTeacherById(
        req.params.id
      );
      return res.status(202).send(deletedTeacher);
    } catch (e) {
      res.status(400).send(e);
    }
  },
  async getTeacherPersonalDetailById(req, res) {
    try {
      const teacherDetails =
        await TeachersServices.getTeacherPersonalDetailById(req.params.id);
      return res.status(202).send(teacherDetails);
    } catch (e) {
      res.status(400).send(e);
    }
  },
};
