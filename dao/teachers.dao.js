const DaoError=require("../errors/dao.errors").getDAOErrorMessage;
const Teacher = require("../models/teachers.model");


module.exports={
    addNewTeacher(teacherDetails){
        return new Promise((resolve, reject)=>{
            new Teacher(teacherDetails).save().then((teacherDetails)=>{
                resolve(teacherDetails)
            }).catch((error)=>{
                if(error.code===11000 && error.keyValue.email){

                    reject(DaoError("teacher already present with this email",503,error))
                }
                reject(DaoError("unable to create new teacher",503,error))
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
            Teacher.findByIdAndUpdate(teacherId, newTeacherDetails,{new:true}).then((updatedTeacherDetails)=>{
                if(!updatedTeacherDetails){
                    reject("no teacher found", 400)
                }
                resolve(updatedTeacherDetails)
            }).catch((error)=>{
                reject(DaoError("unable to update teacher",503,error))
            })
        })
    },

    deleteTeacherById(teacherId, deleteTeacher){
        return new Promise((resolve, reject)=>{
            Teacher.findByIdAndDelete(teacherId, deleteTeacher).then((deletedTeacher)=>{
                if(!deletedTeacher){
                    reject("no teacher found", 400)
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
                resolve(teacherDetails)
            }).catch((error)=>{
                reject(DaoError("unable to find teacher",503,error))
            })
        })
    },
    getAllAvailableTeachers() {
        return new Promise((resolve, reject) => {
            Teacher.find({ is_available: true })
                .then((teachers) => {
                    resolve(teachers);
                })
                .catch((err) => {
                    reject(DaoError("unable to find teachers",503,err));
                });
        });
    },
    
};