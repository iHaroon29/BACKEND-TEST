const Teacher = require("../models/teachers.model");
const teacherValidator = require("../utils/Teacher.validators");
const bcrypt = require("bcrypt");

module.exports = {
    addNewTeacher(teacherDetails) {
        return teacherValidator
            .newTeacher(teacherDetails)
            .then(async (validData) => {
                let teacher = await Teacher.findOne({ email: validData.email });
                if (teacher) throw "Teacher already Registered";

                teacher = new Teacher(validData);

                const salt = await bcrypt.genSalt(10);
                teacher.password = await bcrypt.hash(teacher.password, salt);
                await teacher.save();
                return teacher;
            });
    },
    addNewTeacherUsingExcelSheet() {},
    getAllTeachersAndPersonalDetails() {
        return Teacher.find().then((teachers) => {
            return teachers;
        });
    },
    updateTeacherPersonalDetailsById(teacherId, updateDetails) {
        return teacherValidator
            .updateTeacherDetails(updateDetails)
            .then((validDetails) => {
                return Teacher.findByIdAndUpdate(teacherId, validDetails, {
                    new: true,
                }).then((updatedDetails) => {
                    return updatedDetails;
                });
            });
    },

    async deleteTeacherById(teacherId) {
        let teacher = await Teacher.findOne({ _id: teacherId });
        if (!teacher) throw "Given Id not found";

        const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
        return deletedTeacher;
    },
    async getTeacherPersonalDetailById(teacherId) {
        let teacher = await Teacher.findOne({ _id: teacherId });
        if (!teacher) throw "Given Id not found";

        return teacher;
    },
    getTeacherActivityById() {},
    getAllAvailableTeachers(){
        return new Promise((resolve,reject)=>{
            return Teacher.find({is_available:true}).then(teachers=>{
                resolve(teachers);
                return teachers;
            }).catch(errorInFindingTeacher=>{
                reject({
                    trace:errorInFindingTeacher,
                    statusCode:503
                })
            })
        })

    },
    findTeacherByEmail(emailId){
        return new Promise((resolve,reject)=>{
            Teacher.findOne({email:emailId}).then(teacher=>{
                if(!teacher){
                    reject({
                        message:"No teacher found with this email id",
                        statusCode:400,
                        trace:"No trace available"
                    })
                }
                resolve(teacher);
            }).catch(err=>{
                reject({
                    statusCode:503,
                    message:"Unable to find teacher",
                    trace:err
                })
            })
        })
    }
};
