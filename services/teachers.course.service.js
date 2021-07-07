const Course = require("../models/courses.model");
const ServiceErrorMessage=require("../errors/serviceErrorMessage").getRejectResponse;
module.exports = {
  async addTeacherToCourse(courseId, teacherDetails) {
    try {
      let course=await Course.findById(courseId);
      if(!course){
        throw ServiceErrorMessage("course not available",400);
      }
      if(course.teachers[teacherDetails]){
        throw ServiceErrorMessage("teacher already present",400);
      }
      console.log(course);
      course=JSON.parse(JSON.stringify(course));
      if(!course.teachers){
        course.teachers={};
      }
      if(Array.isArray(course.teachers)){
        course.teachers.push(teacherDetails);
      }else{
        course.teachers[teacherDetails]={createdAt:Date.now()};
      }
      course=await Course.findByIdAndUpdate(courseId,course,{new:true});
      return course;
    }catch (e) {
      return ServiceErrorMessage(e.message||"unable to add teacher to course",503,e)
    }
  },

  async removeTeacherFromCourse(courseId, teacherDetails) {
    try {
      let course=await Course.findById(courseId);
      if(!course){
        throw ServiceErrorMessage("course not available",400);
      }
      if(course.teachers && !course.teachers[teacherDetails]){
        throw ServiceErrorMessage("teacher not present in specified course",400);
      }
      console.log(course);
      course=JSON.parse(JSON.stringify(course));
      if(!course.teachers){
        course.teachers={};
      }
      if(Array.isArray(course.teachers)){
        course.teachers={};
      }else{
        delete course.teachers[teacherDetails];
      }
      course=await Course.findByIdAndUpdate(courseId,course,{new:true});
      return course;
    }catch (e) {
      return ServiceErrorMessage(e.message||"unable to remove teacher to course",503,e)
    }
  },
};
