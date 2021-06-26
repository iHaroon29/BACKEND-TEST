const Course = require("../models/courses.model");
const courseValidator = require("../utils/Course.validators");
const CourseSectionService=require("../services/course.section.services");
const CourseActivityLogger = require("../middlewares/courses.activity.logger");

module.exports = {
  getCourseByCourseId(courseId){
    return Course.findById(courseId).then(course=>{
      course=JSON.parse(JSON.stringify(course));
      return CourseSectionService.getAllCourseSectionByCourseId(course._id)
          .then((courseSections)=>{
            course.course_section=courseSections;
            delete course.quiz;
            return course;
          });
    })
  },
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
      return (async()=>{
        let coursesWithCourseSections=[];
        for(let course of courses){
          const temp=JSON.parse(JSON.stringify(course));
          delete temp.quiz;
          temp.course_section=await CourseSectionService.getAllCourseSectionByCourseId(temp._id)||[];
          coursesWithCourseSections.push(temp);
        }
        return coursesWithCourseSections;
      })();

    });
  },
};
