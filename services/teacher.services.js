const teacherValidator = require("../validators/Teacher.validators");
const bcrypt = require("../modules/bcrypt");
const xlsx = require("../modules/excel.converter");
const ServiceErrorMessage =
    require("../errors/serviceErrorMessage").getRejectResponse;
const MailService=require("../modules/emailSender");
const TokenHandler=require("../modules/tokenHandler");
const OtpDao=require("../dao/otp.dao");
const ActivityLogger=require("../loggers/activity.logger");
const LOG_FOR_TEACHER=require("../config/LOGGERS_FOR").teacher;
const TeacherDao=require("../dao/teachers.dao");

module.exports = {
    async addNewTeacher(teacherDetails,userDetails={}) {
        try {
            const teacherValidDetails=await teacherValidator.newTeacher(teacherDetails);
            teacherValidDetails.password=await bcrypt.genHash(teacherValidDetails.password);
            const newDetails=await TeacherDao.addNewTeacher(teacherValidDetails);
            await ActivityLogger.logActivityCreatedNew(newDetails,LOG_FOR_TEACHER,userDetails).catch()
            return newDetails;
        }catch (e) {
            throw ServiceErrorMessage(e.message||"unable to create new teacher",e.statusCode||503,e);
        }
    },
    async addNewTeacherUsingExcelSheet(file) {
        const createdTeacher=[];
        const unableToCreateTeacher=[];
        const teachers=xlsx.excelToJson(file.path);
        for (let i in  teachers) {
            await teacherValidator.newTeacher(teachers[i])
                .then(async (validTeacher)=>{
                    validTeacher.password=await bcrypt.genHash(validTeacher.password);
                    const savedTeacher=await TeacherDao.addNewTeacher(validTeacher);
                    createdTeacher.push(savedTeacher);
                })
                .catch((err)=>{
                    unableToCreateTeacher.push({
                        index:i,
                        teacher_details:teachers[i],
                        trace:err
                    })
                });
        }
        return {unableToCreateTeacher,createdTeacher};
    },

    async getAllTeachersAndPersonalDetails() {
        try {
            return await TeacherDao.getAllTeachers();
        }catch (e) {
            throw ServiceErrorMessage(e.message||"unable to get all teachers",e.statusCode||503,e);
        }
    },

    async updateTeacherPersonalDetailsById(teacherId, updateDetails,userDetails={}) {
        try {
            const teacherValidDetails=await teacherValidator.updateTeacherDetails(updateDetails);
            if(teacherValidDetails.password){
                teacherValidDetails.password=await bcrypt.genHash(teacherValidDetails.password);
            }
            const oldDetails=await TeacherDao.getTeacherById(teacherId);
            if(!oldDetails){
                throw ServiceErrorMessage("no teacher found",400);
            }
            const newDetails=await TeacherDao.updateTeacherById(teacherId,teacherValidDetails);
            await ActivityLogger.logActivityUpdated(oldDetails,newDetails,LOG_FOR_TEACHER,userDetails).catch();
            return newDetails;
        }catch (e) {
            throw ServiceErrorMessage(e.message||"unable to update teacher",e.statusCode||503,e);
        }
    },

    async deleteTeacherById(teacherId,userDetails={}) {
        try {
            const deletedTeacherDetails=await TeacherDao.deleteTeacherById(teacherId);
            await ActivityLogger.logActivityDeleted(deletedTeacherDetails,LOG_FOR_TEACHER,userDetails).catch();
            return deletedTeacherDetails;
        }catch (e) {
            throw ServiceErrorMessage(e.message||"unable to delete teacher",e.statusCode||503,e);
        }
    },
    async getTeacherPersonalDetailById(teacherId) {
        try {
            const teacherDetails= await TeacherDao.getTeacherById(teacherId);
            if(!teacherDetails){
                throw ServiceErrorMessage("no teacher found",400);
            }
            return teacherDetails
        }catch (e) {
            throw ServiceErrorMessage(e.message||"unable to delete teacher",e.statusCode||503,e);
        }
    },
    async getAllAvailableTeachers() {
        try {
            return await TeacherDao.getAllAvailableTeachers();
        }catch (e) {
            throw ServiceErrorMessage(e.message||"unable to get all available teachers",e.statusCode||503,e);
        }
    },
    async findTeacherByEmail(emailId) {
        try {
            return await TeacherDao.getTeacherByEmail(emailId);
        }catch (e) {
            throw ServiceErrorMessage(e.message||"unable to get teacher",e.statusCode||503,e);
        }
    },
    async sendMailForPasswordUpdateTeacher(email){
        try{
            let TeacherDetails=await TeacherDao.getTeacherByEmail(email)
                .then((teacherDetails)=>{
                    if(!teacherDetails){
                        throw ServiceErrorMessage("no teacher found",400)
                    }
                    return teacherDetails
                });
            const Token=await TokenHandler.encodeWithoutRole(TeacherDetails._id,60*30);
            const otp=await OtpDao.createNewOtp(Token.token,"teacher");
            const MailStatus=await MailService.sendMailWithOutAttachment(TeacherDetails.email,"update password link",
                `
            link is active for 30 minutes only
            your otp is ${otp}
          <a href="http://localhost:8004/lms/api/authenticated/update/password/${Token.token}">click here to update password</a>
          `
            );
            return "mail sent";
        }catch (e) {
            throw ServiceErrorMessage(e.message||"unable to update password",e.statusCode||503,e)
        }
    },
    /**
     * @return {string}
     */
    async PasswordUpdateOfTeacher(newPassword,token,otp){
        try{
            const decodedToken=await TokenHandler.decodeToken(token);
            await OtpDao.verifyOTP(token,otp,"teacher");
            const updatedPassword=await TeacherDao.updateTeacherById(decodedToken.token_details,{password:newPassword},{new:true});
            return "password updated";
        }catch (e) {
            return ServiceErrorMessage(e.message||"unable to update password",e.statusCode||503,e)
        }
    }
};
