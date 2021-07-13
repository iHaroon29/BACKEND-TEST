const DaoError=require("../errors/dao.errors").getDAOErrorMessage;
const Teacher = require("../models/teachers.model");
const Classroom=require("../models/classrooms.model");


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

    async getAllTeachers(){
        try{
            const teacherDetails=JSON.parse(JSON.stringify(await  Teacher.find()));
            for(let i in teacherDetails){
                let teacherId=teacherDetails[i]._id;
                // teacherDetails[i]={};
                teacherDetails[i]=JSON.parse(JSON.stringify(await this.getTeacherById(teacherId)));
            }
            return teacherDetails;
        }catch (e) {
            console.log(e)
            throw DaoError("unable to get all available teachers",503,e);
        }
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

    async getTeacherById(teacherId){
        try{
            const teacherDetails={};
            teacherDetails.personelDetails=JSON.parse(JSON.stringify(await Teacher.findById(teacherId)));
            let filter={};
            filter["teachers."+teacherId]={
                $exists:true
            };
            teacherDetails.classroomDetails=JSON.parse(JSON.stringify(await Classroom.find(filter)));
            return teacherDetails;
        }catch (e) {
            throw DaoError("unable to get teacher",503,e);
        }
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
    async getAllAvailableTeachers() {
        try{
            const teacherDetails=JSON.parse(JSON.stringify(await  Teacher.find({ is_available: true })));
            for(let i in teacherDetails){
                let teacher=teacherDetails[i];
                teacher[i]=JSON.parse(JSON.stringify(await this.getTeacherById(teacher._id)));
            }
            return teacherDetails;
        }catch (e) {
            throw DaoError("unable to get all available teachers",503,e);
        }
    },

};