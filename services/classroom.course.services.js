const ClassroomDao=require("../dao/classroom.dao");
const CourseDao=require("../dao/course.dao");
const ActivityLogger=require("../loggers/activity.logger");
const ServiceErrorMessage=require("../errors/serviceErrorMessage").getRejectResponse;
const LOG_FOR_CLASSROOM=require("../config/LOGGERS_FOR").classroom;
module.exports={
    async getAllClassroomByCourseId(courseId){
        try {
            return await ClassroomDao.getAllClassroomsByCourseId(courseId);
        }catch (e) {
            throw ServiceErrorMessage("unable to get classrooms",503,e)
        }
    },
    async addCourseInClassroom(classroomId, courseId, teacherId,userDetails={}) {
        try{
            const courseWithTeacherId=await CourseDao.checkIfTeacherIsEnrolledInSpecifiedCourse(teacherId,courseId);
            const oldClassroomDetails=await ClassroomDao.getClassroomDetailsById(classroomId);
            if(oldClassroomDetails.enrolled_courses[courseId]){
                throw ServiceErrorMessage("course already enrolled",400);
            }
            let updateClassroomDetails=oldClassroomDetails;
            updateClassroomDetails.enrolled_courses[courseId]={createdAt:Date.now()};
            if(!updateClassroomDetails.teachers){
                updateClassroomDetails.teachers={};
            }
            if(!updateClassroomDetails.teachers[teacherId])
                updateClassroomDetails.teachers[teacherId]={createdAt:Date.now()};
            const newClassroomDetails=await ClassroomDao.updateClassroomDetailsById(classroomId,
                updateClassroomDetails
            );
            await ActivityLogger.logActivityUpdated(oldClassroomDetails,newClassroomDetails,LOG_FOR_CLASSROOM,userDetails);
            return newClassroomDetails;
        }catch (e) {
            console.log(e);
            throw ServiceErrorMessage(e.message||"unable to add course",400);
        }
    },
    async removeCourseFromClassroom(classroomId,courseId,userDetails={}){
        try{
            const oldClassroomDetails=await ClassroomDao.getClassroomDetailsById(classroomId);
            if(!oldClassroomDetails.enrolled_courses[courseId]){
                throw ServiceErrorMessage("course not enrolled",400);
            }
            let newCourseDetails=oldClassroomDetails;
            delete newCourseDetails[courseId];
            const newClassroomDetails=await ClassroomDao.updateClassroomDetailsById(classroomId,newCourseDetails);
            await ActivityLogger.logActivityUpdated(oldClassroomDetails,newClassroomDetails,LOG_FOR_CLASSROOM,userDetails);
            return newClassroomDetails;
        }catch (e) {
            throw ServiceErrorMessage(e.message||"unable to remove course",400);
        }
    },
    async getAllClassroomByStudentId(studentID){
        try{
            return await ClassroomDao.getClassroomByStudentId(studentID);
        }catch (e) {
            throw ServiceErrorMessage(e.message||"unable to get classroom for student",400);
        }
    }
};