const Student = require("../models/students.model");
const Classroom = require("../models/classrooms.model");
const StudentValidator = require("../validators/Students.validators");
const bcrypt = require("../modules/bcrypt");
const xlsx = require("../modules/excel.converter");
const ClassroomDao=require("../dao/classroom.dao");
const StudentDao=require("../dao/students.dao");
const ServiceErrorMessage=require("../errors/serviceErrorMessage").getRejectResponse;
const ActivityLogger=require("../loggers/activity.logger");
const LOG_FOR_STUDENT=require("../config/LOGGERS_FOR").students;
const OtpDao = require("../dao/otp.dao")
const TokenHandler = require("../modules/tokenHandler");
// const MailService = require("../services/email.sender.service")
const MailService=require("../modules/emailSender");



module.exports = {
  async addNewStudent(studentDetails,userDetails={}) {
    try{
      const validData=await StudentValidator.newStudent(studentDetails);
      validData.password=await bcrypt.genHash(validData.password);
      const createdStudent=await StudentDao.createNewStudent(validData);
      const classroomDetails={
        name:validData.name,
        enrolled_students:{}
      };
      classroomDetails.enrolled_students[createdStudent._id]={
        createdAt:Date.now()
      };
      const classroom=await ClassroomDao.createNewClassroom(classroomDetails);
      return {
        studentDetails:createdStudent,
        classroomDetails:classroom
      }
    }catch (e) {
      throw ServiceErrorMessage("unable to create new student",503,e);
    }
  },
  async addNewStudentsUsingExcelSheet(file) {
    const students = xlsx.excelToJson(file.path);

    for (let i = 0; i < students.length; i++) {
      const validStudent = await StudentValidator.newStudent(students[i]);

      let student = await Student.findOne({ email: validStudent.email });
      if (student) {
        continue;
      }
      student = new Student(validStudent);

      await student.save();
    }
    return "students saved successfully";
  },
  async getAllStudentsAndTheirCourseDetails() {
    let student = await Student.find();
    if (student.length === 0) return student;

    let studentCourse = [];

    for (let i = 0; i < student.length; i++) {
      const studentID = student[i]._id;
      const StudentData = {};
      StudentData["enrolled_students." + studentID] = {
        $exists: true,
      };
      let classroom = await Classroom.find(StudentData);
      if (classroom.length === 0) {
        let data = {
          name: student[i].name,
          email: student[i].email,
          course_assigned: [],
          classrooms: [],
        };
        studentCourse.push(data);
        continue;
      }
      let classrooms = [];
      for (let j = 0; j < classroom.length; j++) {
        classrooms.push(classroom[j].name);
      }
      let data = {
        name: student[i].name,
        email: student[i].email,
        course_assigned: Object.keys(classroom[0].enrolled_courses).length,
        classrooms: classrooms,
      };
      if (classroom) studentCourse.push(data);
    }

    return studentCourse;
  },

  async updateStudentCourseDetailsByStudentId(studentId, newDetails) {
    console.log(studentId, newDetails);
  },

  async updateStudentPersonalDetailsById(studentId, updateDetails,userDetails={}) {
    try{
      const oldDetails=await StudentDao.findStudentByStudentId(studentId);
      const validDetails=await StudentValidator.updateStudentDetails(updateDetails);
      const newDetails=await StudentDao.updateStudentByStudentId(studentId,validDetails);
      await ActivityLogger.logActivityUpdated(oldDetails,newDetails,LOG_FOR_STUDENT,userDetails).catch();
      return newDetails;
    }catch (e) {
      throw ServiceErrorMessage("unable to update students",503,e);
    }
  },

  async getAllStudents() {
    try{
      return await StudentDao.getAllStudents();
    }catch (e) {
      throw ServiceErrorMessage("unable to get all students", 503, e);
    }
  },

  async deleteStudentById(studentId,userDetails={}) {
    try{
      const newDetails=await StudentDao.deleteStudentByStudentId(studentId);
      await ActivityLogger.logActivityDeleted(newDetails,LOG_FOR_STUDENT,userDetails).catch();
      return newDetails;
    }catch (e) {
      throw ServiceErrorMessage("unable to update students",503,e);
    }
  },

  async getStudentPersonalDetailById(studentId){
    const student= await Student.findOne({ _id: studentId });
    if (!student) throw "No student with this id available";

    return student;
  },

  async sendMailForPasswordUpdateStudent(email){
    try{
        let studentDetails=await StudentDao.getStudentByEmail(email)
            
        const Token=await TokenHandler.encodeWithoutRole(studentDetails._id,60*30);
        const otp=await OtpDao.createNewOtp(Token.token,"student");
        console.log(studentDetails.email)
        const MailStatus=await MailService.sendMailWithOutAttachment(studentDetails.email,"update password link",
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

async PasswordUpdateOfStudent(newPassword,token,otp){
  try{
      const decodedToken=await TokenHandler.decodeToken(token);
      await OtpDao.verifyOTP(token,otp,"student");
      const updatedPassword=await StudentDao.updateStudentByStudentId(decodedToken.token_details,{password:newPassword},{new:true});
      return "password updated";
  }catch (e) {
      return ServiceErrorMessage(e.message||"unable to update password",e.statusCode||503,e)
  }
}
};
