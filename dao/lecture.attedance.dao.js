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
            const allAttendances= JSON.parse(JSON.stringify(await LectureAttendance.find()));
            for(let i in allAttendances){
                allAttendances[i]=await this.getLectureAttendanceDetailsById(allAttendances[i]._id);
            }
            return allAttendances;
        }catch (e) {
            throw DaoErrorMessage("unable to find all lecture attendances",503,e);
        }
    },
    async updateLectureAttendanceById(lectureId,newLectureAttendanceDetails){
        try{
            return await LectureAttendance.findByIdAndUpdate(lectureId,newLectureAttendanceDetails,{new:true});
        }catch (e) {
            throw DaoErrorMessage("unable to find all lecture attendances",503,e);
        }
    },
    async getAllLectureAttendanceByClassroomId(classroomId){
        try{
            const allLecturesOfClassroom=JSON.parse(JSON.stringify(await Lecture.find({"classroom_id":classroomId})));
            let classroomLectureAttendance=[];
            for(let i in allLecturesOfClassroom){
                classroomLectureAttendance[i]=await this.getLectureAttendanceByLectureId(allLecturesOfClassroom[i]._id);
            }
            return classroomLectureAttendance;
        }catch (e) {
            throw DaoErrorMessage("unable to find all lecture attendances",503,e);
        }
    },
    async getAllLectureAttendanceByStudentId(studentId){
        try{
            const attendanceDetails=JSON.parse(JSON.stringify(await LectureAttendance.find({"student_id":studentId})));
            for(let i in attendanceDetails){
                attendanceDetails[i]=await this.getLectureAttendanceDetailsById(attendanceDetails[i]._id)
            }
            return attendanceDetails;
        }catch (e) {
            throw DaoErrorMessage("unable to find all lecture attendances",503,e);
        }
    },

    async getAllLectureAttendanceByCourseId(courseId) {
        try{
            const allLectures=JSON.parse(JSON.stringify(await Lecture.find({ "course_id": courseId })));
            const attendanceDetails=[];
            // console.log(allLectures)
            for(let i in allLectures){
                let lectureId=allLectures[i]._id;
                const attendanceDetails=await this.getLectureAttendanceByLectureId(lectureId);
                attendanceDetails[i]=attendanceDetails;
            }
            return attendanceDetails;
        }catch (e) {
            throw DaoErrorMessage("unable to find all lecture attendances",503,e);
        }
    },

    async getLectureAttendanceDetailsById(lectureAttendanceId){
        try{
            let lectureAttendanceDetails=JSON.parse(JSON.stringify(await LectureAttendance.findById(lectureAttendanceId)))||{};
            if(!lectureAttendanceDetails){
                return "No details found";
            }
            lectureAttendanceDetails.student=await Student.findById(lectureAttendanceDetails.student_id).catch();
            lectureAttendanceDetails.lecture=await Lecture.findById(lectureAttendanceDetails.lecture_id);
            lectureAttendanceDetails.course=await Course.findById(lectureAttendanceDetails.lecture.course_id);
            // delete lectureAttendanceDetails.course_id;
            // delete lectureAttendanceDetails.lecture_id;
            // delete lectureAttendanceDetails.student_id;
            return lectureAttendanceDetails;
        }catch (e) {
            throw DaoErrorMessage("unable to get lecture attendance details",503,e)
        }
    }
};