const Teacher = require("../models/teachers.model");
const teacherValidator = require("../validators/Teacher.validators");
const CourseService=require("./course.services");
const ClassroomCourseService=require("./classroom.course.services");
const bcrypt = require("../modules/bcrypt");
const RejectResponseMessage=require("../errors/serviceErrorMessage").getRejectResponse;

module.exports = {
    addNewTeacher(teacherDetails) {
        return new Promise((resolve,reject)=>{
            teacherValidator.newTeacher(teacherDetails)
                .then(async (validData) => {
                    this.findTeacherByEmail(validData.email)
                        .then(()=>{
                            reject(RejectResponseMessage("Email: "+validData.email+" already present",406))
                        })
                        .catch((err)=>{
                            if(err.message!=="No teacher found with this email id"){
                                reject(RejectResponseMessage("unable to create new teacher",503,err));
                            }
                            bcrypt.genHash(validData.password)
                                .then(hashedPassword=>{
                                    validData.password=hashedPassword;
                                    new Teacher(validData).save()
                                        .then(savedTeacherDetails=>{
                                            resolve(savedTeacherDetails)
                                        }).catch(err=>{
                                        reject(RejectResponseMessage("unable to create new teacher",503,err))
                                    })
                                }).catch(err=>{
                                reject(RejectResponseMessage("unable to hash password",503,err))
                            })
                        });
                });
        })
    },
    addNewTeacherUsingExcelSheet() {},
    getAllTeachersAndPersonalDetails() {
        return new Promise((resolve,reject)=>{
            Teacher.find().then(async (teachers) => {
                const teacherFullDetails=[];
                for(let teacher of teachers){
                    teacherFullDetails.push(await this.getTeacherPersonalDetailById(teacher._id)
                        .then(teacherDetails=>teacherDetails).catch());
                }
                resolve(teacherFullDetails)
            }).catch(err=>{
                reject(
                    RejectResponseMessage("Unable to find Teacher",503,err)
                )
            })
        })
    },
    updateTeacherPersonalDetailsById(teacherId, updateDetails) {
        return new Promise((resolve,reject)=>{
            teacherValidator.updateTeacherDetails(updateDetails)
                .then((validDetails) => {
                            return Teacher.findByIdAndUpdate(teacherId, validDetails, {
                                new: true,
                            })
                                .then((updatedDetails) =>resolve(updatedDetails))
                                .catch((err)=>{
                                    console.log(err)
                                    reject(
                                        RejectResponseMessage("unable to update teacher details",503,err)
                                    )
                                })
                }).catch(invalidDetails=>{
                reject(RejectResponseMessage("invalid details",400,invalidDetails))
            })
        })
    },

    async deleteTeacherById(teacherId) {
        let teacher = await Teacher.findOne({ _id: teacherId });
        if (!teacher) throw "Given Id not found";

        return Teacher.findByIdAndDelete(teacherId);
    },
    getTeacherPersonalDetailById(teacherId) {
        return new Promise((resolve,reject)=>{
            Teacher.findOne({ _id: teacherId })
                .then(teacherDetails=>{
                    teacherDetails=JSON.parse(JSON.stringify(teacherDetails));
                    teacherDetails.classrooms=[];
                    teacherDetails.courses=[];
                    CourseService.getAllCourseByTeacherId(teacherId)
                        .then(courseDetails=>{
                            teacherDetails.courses=courseDetails;
                            const alreadyAddedClassrooms={};
                            (async ()=>{
                                for(let i of courseDetails){
                                    if(!alreadyAddedClassrooms[i._id]){
                                        teacherDetails.classrooms.push(
                                            await ClassroomCourseService.getAllClassroomByCourseId(i._id)
                                                .then((classroom)=>classroom).catch()
                                        );
                                    }
                                    alreadyAddedClassrooms[i._id]="ADDED";
                                }
                                resolve(teacherDetails);
                            })()

                        })
                        .catch((err)=>{
                            reject(
                                RejectResponseMessage("Unable to find courses",503,err)
                            )
                        })
                }).catch(err=>{
                reject(
                    RejectResponseMessage("Unable to find Teacher",503,err)
                )
            })
        })
    },
    getTeacherActivityById() {},
    getAllAvailableTeachers(){
        return new Promise((resolve,reject)=>{
            return Teacher.find({is_available:true}).then(teachers=>{
                resolve(teachers);
                return teachers;
            }).catch(errorInFindingTeacher=>{
                reject(
                    RejectResponseMessage("unable to find teachers",503,errorInFindingTeacher)
                )
            })
        })
    },
    findTeacherByEmail(emailId) {
        return new Promise((resolve, reject) => {
            Teacher.findOne({ email: emailId })
                .then((teacher) => {
                    if (!teacher) {
                        reject(
                            RejectResponseMessage( "No teacher found with this email id",400)
                        );
                    }
                    resolve(teacher);
                })
                .catch((err) => {
                    reject(
                        RejectResponseMessage("Unable to find teacher",503,err)
                    );
                });
        });
    },
};
