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
                    resolve(studentDetails[0]);
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
            return studentDetails;
        }catch (e) {
            throw DaoError("unable to get students",503,e)
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
    },

    updateStudentByStudentId(studentId, newDetails){
        return new Promise((resolve, reject)=>{
            Student.findByIdAndUpdate(studentId, newDetails,{new:true}).then((studentDetails)=>{
                if(!studentDetails){
                    reject("no student found", 400)
                }
                resolve(studentDetails)
            }).catch((error)=>{
                reject(DaoError("unable to update student",503,error));
            })
        })
    },

    deleteStudentByStudentId(studentId){
        return new Promise((resolve, reject)=>{
            Student.findByIdAndDelete(studentId).then((deletedStudent)=>{
                if(!deletedStudent){
                    reject("no student found", 400)
                }
                resolve(deletedStudent)
            }).catch((error)=>{
                reject(DaoError("unable to delete student",503,error));
            })
        })
    },

    findStudentByStudentId(studentId){
        return new Promise((resolve, reject)=>{
            Student.findById(studentId).then((studentDetails)=>{
                resolve(studentDetails)
            }).catch((error)=>{
                reject(DaoError("unable to delete student",503,error));
            })
        })
    },

    getAllStudents(){
        return new Promise((resolve, reject)=>{
            Student.find().then((allStudentDetails)=>{
                resolve(allStudentDetails)
            }).catch((error)=>{
                reject(DaoError("unable to get all students",503,error));
            })
        })
    }

};