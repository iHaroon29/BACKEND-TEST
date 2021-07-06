const Classroom=require("../models/classrooms.model");
const DaoError=require("../errors/dao.errors").getDAOErrorMessage;

module.exports={
    getClassroomByStudentId(studentId){
        const filter={};
        filter["enrolled_students."+studentId]={
            $exists:true
        };
        return new Promise((resolve,reject)=>{
            Classroom.find(filter)
                .then((allClassrooms)=>{
                    resolve(allClassrooms);
                }).catch(err=>{
                    reject(DaoError("unable to find classrooms",503,err));
            })
        })
    }
};
