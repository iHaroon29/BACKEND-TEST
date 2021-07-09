const Student=require("../models/students.model");
const DaoError=require("../errors/dao.errors").getDAOErrorMessage;
const ClassroomDAO=require("../dao/classroom.dao");

module.exports={
    getStudentByEmail(email){
        return new Promise((resolve,reject)=>{
            if(!email){
                reject(DaoError("email is required",400));
            }
            Student.find({"email":email})
                .then((studentDetails)=>{
                    if(!studentDetails){
                        reject(DaoError("no student found",400))
                    }
                    resolve(studentDetails);
                }).catch((err)=>{
                reject(DaoError("unable to find student",503,err));
            })
        })
    },
    async getStudentFullDetails(studentId){
        try{
            let studentDetails=await Student.findById(studentId);
            studentDetails=JSON.parse(JSON.stringify(studentDetails));
            studentDetails.classrooms=await ClassroomDAO.getClassroomByStudentId(studentId);

        }catch (e) {

        }
    },
    createNewStudent(studentDetails){
        return new Promise((resolve,reject)=>{
            new Student(studentDetails).save()
                .then(savedStudent=>{
                    resolve(savedStudent);
                })
                .catch(err=>{
                    reject(DaoError("unable to create student",503,err));
                })
        })
    }

};