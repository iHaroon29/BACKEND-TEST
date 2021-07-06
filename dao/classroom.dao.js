const Classroom=require("../models/classrooms.model");
const DaoError=require("../errors/dao.errors").getDAOErrorMessage;
const LecturesDao=require("./lectures.dao");

module.exports={
    getClassroomByStudentId(studentId){
        const filter={};
        filter["enrolled_students."+studentId]={
            $exists:true
        };
        return new Promise((resolve,reject)=>{
            Classroom.find(filter)
                .then(async (allClassrooms)=>{
                    allClassrooms=JSON.parse(JSON.stringify(allClassrooms));
                    for(let classroom of allClassrooms){
                        allClassrooms[classroom._id].lectures=await LecturesDao.getAllLecturesOfClassroom(classroom._id)
                            .then(allLectures=>allLectures)
                            .catch();
                    }
                    resolve(allClassrooms);
                }).catch(err=>{
                    reject(DaoError(err.message|| "unable to find classrooms",503,err));
            })
        })
    }
};
