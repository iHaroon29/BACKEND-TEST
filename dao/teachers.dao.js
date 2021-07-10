const DaoError=require("../errors/dao.errors").getDAOErrorMessage;
const Teacher = require("../models/teachers.model");


module.exports={
    addNewTeacher(){
        return new Promise((resolve, reject)=>{
            Teacher.save().then((teacherDetails)=>{
                resolve(teacherDetails)
            }).catch((error)=>{
                reject(DaoError("unable to create teacher",503,error))
            })
        })
    },

    getAllTeachers(){
        return new Promise((resolve, reject)=>{
            Teacher.find().then((teacherDetails)=>{
                resolve(teacherDetails)
            }).catch((error)=>{
                reject(DaoError("unable to find all teachers",503,error))
            })
        })
    },

    updateTeacherById(teacherId, newTeacherDetails){
        return new Promise((resolve, reject)=>{
            Teacher.findByIdAndUpdate(teacherId, newTeacherDetails).then((teacherDetails)=>{
                if(!teacherDetails){
                    reject("unable to update", 400)
                }
                resolve(teacherDetails)
            }).catch((error)=>{
                reject(DaoError("unable to update teacher",503,error))
            })
        })
    },

    deleteTeacherById(teacherId, deleteTeacher){
        return new Promise((resolve, reject)=>{
            Teacher.findByIdAndDelete(teacherId, deleteTeacher).then((deletedTeacher)=>{
                if(!deletedTeacher){
                    reject("unable to delete", 400)
                }
                resolve(deletedTeacher)
            }).catch((error)=>{
                reject(DaoError("unable to delete teacher",503,error))
            })
        })
    },

    getTeacherById(teacherId){
        return new Promise((resolve, reject)=>{
            Teacher.findById(teacherId).then((teacherDetails)=>{
                resolve(teacherDetails)
            }).catch((error)=>{
                reject(DaoError("unable to get teacher",503,error))
            })
        })
    },

    getTeacherByEmail(teacherEmail){
        return new Promise((resolve, reject)=>{
            Teacher.find({email:teacherEmail}).then((teacherDetails)=>{
                if(!teacherDetails){
                    reject("unable to find", 400)
                }
                resolve(teacherDetails)
            }).catch((error)=>{
                reject(DaoError("unable to find teacher",503,error))
            })
        })
    }
    
};