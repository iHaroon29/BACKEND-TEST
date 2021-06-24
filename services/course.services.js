const Course = require("../models/courses.model");
const courseValidator = require("../utils/Course.validators");
const CourseActivityLogger = require("../middlewares/courses.activity.logger");

module.exports = {
  addNewCourse(courseDetails) {
    console.log(courseDetails);
    return courseValidator.newCourse(courseDetails).then((validData) => {
      return new Course(validData).save().then((savedCourse) => {
        // TODO: write in activity log tracker
        CourseActivityLogger.newCourseAdded({});
        return savedCourse;
      });
    });
  },
  updateCourseById(courseId,courseDetails) {
    return courseValidator.updateCourse(courseDetails).then((validData) => {
      return Course.findByIdAndUpdate(courseId, validData, { new: true }).then(
        (updatedCourse) => {
          delete updatedCourse.quiz;
          return updatedCourse;
        }
      );
    });
  },
  deleteCourseById(courseId) {
    return Course.findByIdAndDelete(courseId).then((deletedCourse) => {
      return deletedCourse;
    });
  },
  getAllCourses() {
    return Course.find().then((courses) => {
      return courses.filter(course=>{
        delete course.quiz;
        return course;
      });
    });
  },
};
