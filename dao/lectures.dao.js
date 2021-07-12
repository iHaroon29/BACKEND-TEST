const Lecture=require("../models/lectures.model");
const DAOError=require("../errors/dao.errors").getDAOErrorMessage;
const Classroom = require("./classroom.dao")

module.exports={
    async createNewLecture(lectureDetails){
        try{
            return await new Lecture(lectureDetails).save();
        }catch (e) {
            throw DAOError("unable to create new lecture",503,e)
        }
    },
    async markLectureAsOngoing(lectureId){
        try {
            const updatedLecture=await Lecture.findByIdAndUpdate(lectureId,{status:"ongoing"});
            if(!updatedLecture){
                throw new DAOError("no lecture found",400);
            }
            return updatedLecture;
        }catch (e) {
            throw DAOError(e.message|| "unable to mark lecture as ongoing",503,e);
        }
    },
    async markLectureAsCompleted(lectureId){
        try {
            const updatedLecture=await Lecture.findByIdAndUpdate(lectureId,{status:"completed"});
            if(!updatedLecture){
                throw new DAOError("no lecture found",400);
            }
            return updatedLecture;
        }catch (e) {
            throw DAOError(e.message|| "unable to mark lecture as completed",503,e);
        }
    },
    async getLecturesByTeacherId(teacherId){
        try {
            return await Lecture.find({teacher:teacherId});
        }catch (e) {
            throw DAOError(e.message|| "unable to find all lectures of teachers",503,e);
        }
    },
    async getLecturesByCourseId(courseId){
        try {
            return await Lecture.find({course_id:courseId});
        }catch (e) {
            throw DAOError(e.message|| "unable to find all lectures of course",503,e);
        }
    },
    async getLecturesByClassroomId(classroomId){
        try {
            return await Lecture.find({classroom_id:classroomId});
        }catch (e) {
            throw DAOError(e.message|| "unable to find all lectures of course",503,e);
        }
    },
    async deleteLectureById(lectureId){
        try {
            const deletedLecture=await Lecture.findByIdAndDelete(lectureId);
            if(!deletedLecture){
                throw new DAOError("no lecture found",400);
            }
            return deletedLecture;
        }catch (e) {
            throw DAOError(e.message|| "unable to delete lecture",503,e);
        }
    },
    async getLectureById(lectureId){
        try {
            return await Lecture.findById(lectureId);
        }catch (e) {
            throw DAOError(e.message|| "unable to find lecture",503,e);
        }
    },
    async getAllLecture(){
        try {
            return await Lecture.find();
        }catch (e) {
            throw DAOError(e.message|| "unable to find all lectures",503,e);
        }
    },
    async updateLectureById(lectureId,newLectureDetails){
        try {
            const updatedLecture= await Lecture.findByIdAndUpdate(lectureId,newLectureDetails,{new:true});
            if(!updatedLecture){
                throw DAOError("no lecture found with specified id",400);
            }
            return updatedLecture;
        }catch (e) {
            throw DAOError(e.message|| "unable to find all lectures",503,e);
        }
    },
    async markAsAttendanceDone(lectureId){
        try {
            const updatedLecture= await Lecture.findByIdAndUpdate(lectureId,{is_attendance_marked:true},{new:true});
            if(!updatedLecture){
                throw DAOError("no lecture found with specified id",400);
            }
            return updatedLecture;
        }catch (e) {
            throw DAOError(e.message|| "unable to find all lectures",503,e);
        }
    },
};