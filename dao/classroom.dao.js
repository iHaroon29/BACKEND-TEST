const Classroom=require("../models/classrooms.model");
const DaoError=require("../errors/dao.errors").getDAOErrorMessage;
const LecturesDao=require("./lectures.dao");
const Course=require("../models/courses.model");

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
    },
    async getClassroomByTeacherId(teacherId){
        try{
            let filter={};
            filter["teachers."+teacherId]={
                $exists:true
            };
            const coursesInTeacherIsEnrolled=await Course.find(filter)
                .catch(
                    err=>{
                        throw DaoError("unable to find course",503,err);
                    });
            if(!coursesInTeacherIsEnrolled){
                throw DaoError("no course found for the specified teacher",400)
            }
            const classroomsOfTeacher=[];
            for(let i in coursesInTeacherIsEnrolled){
                console.log(i);
            }
            return ["none"];
        }catch (e) {

        }
    }
};
