const Course = require("../models/courses.model");
const courseValidator = require("../utils/Course.validators");
const CourseSectionService=require("../services/course.section.services");
const CourseActivityLogger = require("../middlewares/courses.activity.logger");

module.exports = {
  getCourseByCourseId(courseId){
    return new Promise((resolve,reject)=>{
      Course.findById(courseId).then(course=>{
        course=JSON.parse(JSON.stringify(course));
        return CourseSectionService.getAllCourseSectionByCourseId(course._id)
            .then((courseSections)=>{
              course.course_section=courseSections;
              delete course.quiz;
              resolve(course);
              return course;
            }).catch(err=>{
              reject({
                message:"unable to find course sections",
                trace:err,
                statusCode:503
              })
            })
      }).catch(err=>{
        reject({
          message:"unable to find course",
          trace:err,
          statusCode:503
        })
      })
    })
  },
  addNewCourse(courseDetails) {
    return courseValidator.newCourse(courseDetails).then((validData) => {
      return new Course(validData).save().then((savedCourse) => {
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
    return new Promise((resolve,reject)=>{
      Course.find().then((courses) => {
        return (async()=>{
          let coursesWithCourseSections=[];
          for(let course of courses){
            const temp=JSON.parse(JSON.stringify(course));
            delete temp.quiz;
            temp.course_section=await CourseSectionService.getAllCourseSectionByCourseId(temp._id)||[];
            coursesWithCourseSections.push(temp);
          }
          resolve(coursesWithCourseSections);
          return coursesWithCourseSections;
        })();

      }).catch(e=>{
        reject({
          message:"unable to find course",
          trace:e,
          code:503
        })
      })
    })
  },
  getAllCourseByTeacherId(teacherId){
    return new Promise((resolve,reject)=>{
      const filter={};
      filter['teachers.'+teacherId]={$exists:true};
      Course.find(filter).then(allCourses=>{
        if(!allCourses){
          reject({
            message:"No Course found with specified teacher id",
            statusCode:204,
            trace:"No trace found"
          })
        }
        resolve(allCourses);
      })
          .catch(err=>{
            reject({
              message:"error in finding courses",
              statusCode:503,
              trace:"No trace found"
            })
          })
    })
  }
};
