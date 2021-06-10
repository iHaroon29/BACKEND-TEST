const Lecture=require("../../models/mongodb/lectures");
const LectureValidators=require("../../utils/lecturesvalidtors");
module.exports={
    addNewLectureInClassroom(classroomId, lectureDetails){
        return LectureValidators.addNewLectureToClassroom(lectureDetails)
            .then(validLectureDetails=>{
                return new Lecture(validLectureDetails).save()
                    .then(savedDetails=>{
                        return savedDetails;
                    })
            })
    },
    updateLectureById(classroomId,lectureId,lectureDetails){
        return LectureValidators.updateLecture(lectureDetails)
            .then(validNewLectureDetails=>{
                Lecture.findOneAndUpdate({classroom_id:classroomId,_id:lectureId},validNewLectureDetails,{new:true})
                    .then(updatedDetails=>{
                        return updatedDetails;
                    })
            })

    },
    deleteLectureById(classroomId,lectureId){
        return Lecture.findOneAndDelete({classroom_id:classroomId,_id:lectureId})
            .then(deletedDetails=>{
                return deletedDetails;
            })

    },
    updateLectureStatusById(lectureId,lectureDetails){
        return Lecture.findByIdAndUpdate(lectureId,lectureDetails,{new:true})
            .then(updatedDetails=>{
                return updatedDetails;
            })
    },
    getAllLecturesOfClassroom(classroomId){
        return Lecture.find({classroom_id:classroomId})
    },
    getLectureDetailsById(lectureId){
        return Lecture.findById(lectureId)
            .then(lectureDetails=>{
                return lectureDetails;
            })
    },
    getTotalLecturesInClassroom(classroomId){
        return Lecture.find({classroom_id:classroomId})
            .then(lectures=>{
                return lectures.length;
            })
    },
    getTotalLecturesInCourse(lecture_id){
        return Lecture.find({lecture_id:lecture_id})
            .then(lectures=>{
                return lectures.length;
            })
    },
};