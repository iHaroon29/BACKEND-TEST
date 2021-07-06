const Course = require("../models/courses.model");
module.exports = {
  async addTeacherToCourse(courseId, teacherDetails) {
    const course = await Course.find({
      _id: courseId,
      teachers: { $in: [teacherDetails] },
    });
    if (course.length !== 0) throw "Teacher already Exist in the Course";

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { teachers: teacherDetails },
      },
      {
        new: true,
      }
    );
    return updatedCourse;
  },

  async removeTeacherFromCourse(courseId, teacherDetails) {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: { teachers: { $in: [teacherDetails] } },
      },
      {
        new: true,
      }
    );
    return updatedCourse;
  },
};
