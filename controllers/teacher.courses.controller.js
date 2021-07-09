const TeacherCourseService = require("../services/teachers.course.service");
module.exports = {
  async addTeacherToCourse(req, res) {
    try {
      const TeacherDetails = await TeacherCourseService.addTeacherToCourse(
        req.params.courseId,
        req.params.teacherId
      );
      return res.status(202).send(TeacherDetails);
    } catch (e) {
      // console.log(e);
      return res.status(e.statusCode||400).send(e);
    }
  },
  async removeTeacherFromCourse(req, res) {
    try {
      const TeacherDetails = await TeacherCourseService.removeTeacherFromCourse(
        req.params.courseId,
        req.params.teacherId
      );
      return res.status(202).send(TeacherDetails);
    } catch (e) {
      return res.status(400).send(e);
    }
  },
  async getAllTeachersInTheCourse(req, res) {
    try {
      const AllTeachers =
        await TeacherCourseService.getAllTeachersInTheCourse();
      return res.status(202).send(AllTeachers);
    } catch (e) {
      return res.status(400).send(e);
    }
  },
};
