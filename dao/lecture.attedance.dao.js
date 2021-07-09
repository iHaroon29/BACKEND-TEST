const LectureAttendance=require("../models/lecture.attendances.model");
const DaoErrorMessage=require("../errors/dao.errors").getDAOErrorMessage;
const Student=require("../models/students.model");
const Course=require("../models/courses.model");
const Lecture=require("../models/lectures.model");
module.exports={
    async markStudentAsPresentUsingLectureId(lectureAttendanceDetails) {
        try{
            return LectureAttendance.findOneAndUpdate({lecture_id:lectureAttendanceDetails.lecture_id,student_id:lectureAttendanceDetails.student_id},lectureAttendanceDetails,{upsert:true})
        }catch (e) {
            throw DaoErrorMessage("unable to add lecture attendance",503,e);
        }
    },
    async getLectureAttendanceByLectureId(lectureId) {
        try{
            let lectureAttendanceDetails=JSON.parse(JSON.stringify(await LectureAttendance.find({lecture_id:lectureId})));
            for(let i in lectureAttendanceDetails){
                lectureAttendanceDetails[i]=await this.getLectureAttendanceDetailsById(lectureAttendanceDetails[i]._id)
            }
            return lectureAttendanceDetails;
        }catch (e) {
            throw DaoErrorMessage("unable to find lecture attendance",503,e);
        }
    },
    async getAllLectureAttendance() {
        try{
            return LectureAttendance.find();
        }catch (e) {
            throw DaoErrorMessage("unable to find all lecture attendances",503,e);
        }
    },
    async getLectureAttendanceDetailsById(lectureAttendanceId){
        try{
            let lectureAttendanceDetails=JSON.parse(JSON.stringify(await LectureAttendance.findById(lectureAttendanceId)));
            lectureAttendanceDetails.student=await Student.findById(lectureAttendanceDetails.student_id).catch();
            lectureAttendanceDetails.lecture=await Lecture.findById(lectureAttendanceDetails.lecture_id);
            lectureAttendanceDetails.course=await Course.findById(lectureAttendanceDetails.lecture.course_id);
            delete lectureAttendanceDetails.course_id;
            delete lectureAttendanceDetails.lecture_id;
            delete lectureAttendanceDetails.student_id;
            return lectureAttendanceDetails;
        }catch (e) {
          throw DaoErrorMessage("unable to get lecture attendance details",503,e)
        }
    }
};