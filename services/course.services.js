const courseValidator = require("../validators/Course.validators");
const ActivityLogger = require("../loggers/activity.logger");
const CourseDao=require("../dao/course.dao");
const ServiceErrorMessage=require("../errors/serviceErrorMessage").getRejectResponse;

module.exports = {
  getCourseByCourseId(courseId){
    return new Promise((resolve,reject)=>{
      CourseDao.getCourseByCourseId(courseId)
          .then(courseDetails=>{
            resolve(courseDetails)
          }).catch(err=>{
        reject(ServiceErrorMessage("unable to find course",503,err));
      })
    })
  },
  async addNewCourse(courseDetails,userDetails) {
    try{
      const validData=await courseValidator.newCourse(courseDetails);
      // let teachers=validData.teachers;
      // validData.teachers={};
      // console.log(teachers);
      // for(let teacherId of teachers){
      //   validData.teachers[teacherId]={createdAt:Date.now()}
      // }
      // console.log(validData);
      const createdCourse=await CourseDao.createNewCourse(validData);
      await ActivityLogger.logActivityCreatedNew(createdCourse,"course",userDetails||{});
      return createdCourse;
    }catch (e) {
      return ServiceErrorMessage(e.message||"unable to delete course",e.statusCode||503,e)
    }
  },
  async updateCourseById(courseId,courseDetails,userDetails) {
    try{
      courseDetails._id=courseId;
      const validData=courseValidator.updateCourse(courseDetails)
          .catch(err=>{throw new ServiceErrorMessage("invalid data",400,err)});
      const oldCourse=await CourseDao.getCourseByCourseId(courseId);
      const updatedCourse=await CourseDao.updateCourseByCourseId(courseId,courseDetails);
      await ActivityLogger.logActivityUpdated(oldCourse, updatedCourse, "course",userDetails||{});
      return updatedCourse;
    }catch (e) {
      return ServiceErrorMessage(e.message||"unable to update course",e.statusCode||503,e)
    }
  },
  async deleteCourseById(courseId,userDetails) {
    try{
      const deletedCourse=await CourseDao.deleteCourseByCourseId(courseId);
      await ActivityLogger.logActivityDeleted(deletedCourse,"course",userDetails||{});
      return  deletedCourse;
    }catch (e) {
      return ServiceErrorMessage(e.message||"unable to delete course",e.statusCode||503,e)
    }
  },
  getAllCourses() {
    return new Promise((resolve,reject)=>{
      CourseDao.getAllCourses()
          .then(allCourses=>{
            if(!allCourses){
              reject(ServiceErrorMessage("no course found",204))
            }
            resolve(allCourses)
          }).catch(err=>{
        reject(ServiceErrorMessage(err.message||"unable to find courses",err.statusCode||503,err))
      })
    })
  },
  getAllCourseByTeacherId(teacherId){
    return new Promise((resolve,reject)=>{
      CourseDao.getCourseByTeacherId(teacherId)
          .then(allCourses=>{
            if(!allCourses){
              reject(ServiceErrorMessage("no course present",400));
            }
            resolve(allCourses);
          }).catch(err=>{
        reject(ServiceErrorMessage(err.message||"unable to find courses",err.statusCode||503,err))
      })
    })
  }
};
