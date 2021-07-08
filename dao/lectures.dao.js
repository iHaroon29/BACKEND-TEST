const Lecture=require("../models/lectures.model");
const DAOError=require("../errors/dao.errors").getDAOErrorMessage;
const Classroom = require("./classroom.dao")

module.exports={
    getAllLecturesOfClassroom(classroomId){
        return new Promise((resolve,reject)=>{
            const lectureFilter={};
            lectureFilter["classroom_id."+classroomId]={
                $exists:true,
            };
            Lecture.find(lectureFilter)
                .then(allLectures=>{
                    resolve(allLectures)
                }).catch(err=>{
                    reject(DAOError("unable to get lectures",503,err));
            })
        })
    },

    getLectureDetailsById(){

    },

    getAllLectures(){

    },

    updateLectureById(){

    },
    deleteLectureById(){

    },
    addNewLectureInClassroom(){

    },

};