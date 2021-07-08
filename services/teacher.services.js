const Teacher = require("../models/teachers.model");
const teacherValidator = require("../validators/Teacher.validators");
const CourseService = require("./course.services");
const ClassroomCourseService = require("./classroom.course.services");
const bcrypt = require("../modules/bcrypt");
const xlsx = require("../modules/excel.converter");
const RejectResponseMessage =
    require("../errors/serviceErrorMessage").getRejectResponse;
const MailService=require("../modules/emailSender");
const TokenHandler=require("../modules/tokenHandler");
const OtpDao=require("../dao/otp.dao");

module.exports = {
  addNewTeacher(teacherDetails) {
    return new Promise((resolve, reject) => {
      teacherValidator.newTeacher(teacherDetails).then(async (validData) => {
        this.findTeacherByEmail(validData.email)
            .then(() => {
              reject(
                  RejectResponseMessage(
                      "Email: " + validData.email + " already present",
                      406
                  )
              );
            })
            .catch((err) => {
              if (err.message !== "No teacher found with this email id") {
                reject(
                    RejectResponseMessage("unable to create new teacher", 503, err)
                );
              }
              bcrypt
                  .genHash(validData.password)
                  .then((hashedPassword) => {
                    validData.password = hashedPassword;
                    new Teacher(validData)
                        .save()
                        .then((savedTeacherDetails) => {
                          resolve(savedTeacherDetails);
                        })
                        .catch((err) => {
                          reject(
                              RejectResponseMessage(
                                  "unable to create new teacher",
                                  503,
                                  err
                              )
                          );
                        });
                  })
                  .catch((err) => {
                    reject(
                        RejectResponseMessage("unable to hash password", 503, err)
                    );
                  });
            });
      });
    });
  },
  async addNewTeacherUsingExcelSheet(file) {
    const teachers = xlsx.excelToJson(file.path);
    for (let i = 0; i < teachers.length; i++) {
      const validTeacher = await teacherValidator.newTeacher(teachers[i]);

      let teacher = await Teacher.findOne({ email: validTeacher.email });
      if (teacher) {
        continue;
      }
      teacher = new Teacher(validTeacher);

      await teacher.save();
    }
    return "Teachers saved successfully";
  },

  getAllTeachersAndPersonalDetails() {
    return new Promise((resolve, reject) => {
      Teacher.find()
          .then(async (teachers) => {
            resolve(teachers);
          })
          .catch((err) => {
            reject(RejectResponseMessage("Unable to find Teacher", 503, err));
          });
    });
  },

  updateTeacherPersonalDetailsById(teacherId, updateDetails) {
    return new Promise((resolve, reject) => {
      teacherValidator
          .updateTeacherDetails(updateDetails)
          .then((validDetails) => {
            return Teacher.findByIdAndUpdate(teacherId, validDetails, {
              new: true,
            })
                .then((updatedDetails) => resolve(updatedDetails))
                .catch((err) => {
                  console.log(err);
                  reject(
                      RejectResponseMessage(
                          "unable to update teacher details",
                          503,
                          err
                      )
                  );
                });
          })
          .catch((invalidDetails) => {
            reject(RejectResponseMessage("invalid details", 400, invalidDetails));
          });
    });
  },

  async deleteTeacherById(teacherId) {
    let teacher = await Teacher.findOne({ _id: teacherId });
    if (!teacher) throw "Given Id not found";

    return Teacher.findByIdAndDelete(teacherId);
  },
  getTeacherPersonalDetailById(teacherId) {
    return new Promise((resolve, reject) => {
      Teacher.findOne({ _id: teacherId })
          .then((teacherDetails) => {
            teacherDetails = JSON.parse(JSON.stringify(teacherDetails));
            teacherDetails.classrooms = [];
            teacherDetails.courses = [];
            CourseService.getAllCourseByTeacherId(teacherId)
                .then((courseDetails) => {
                  teacherDetails.courses = courseDetails;
                  const alreadyAddedClassrooms = {};
                  (async () => {
                    for (let i of courseDetails) {
                      if (!alreadyAddedClassrooms[i._id]) {
                        teacherDetails.classrooms.push(
                            await ClassroomCourseService.getAllClassroomByCourseId(
                                i._id
                            )
                                .then((classroom) => classroom)
                                .catch()
                        );
                      }
                      alreadyAddedClassrooms[i._id] = "ADDED";
                    }
                    resolve(teacherDetails);
                  })();
                })
                .catch((err) => {
                  reject(RejectResponseMessage("Unable to find courses", 503, err));
                });
          })
          .catch((err) => {
            reject(RejectResponseMessage("Unable to find Teacher", 503, err));
          })
          .catch((err) => {
            reject({
              message: "Unable to find courses",
              statusCode: 503,
              trace: err,
            });
          });
    });
  },
  getTeacherActivityById() {},
  getAllAvailableTeachers() {
    return new Promise((resolve, reject) => {
      return Teacher.find({ is_available: true })
          .then((teachers) => {
            resolve(teachers);
            return teachers;
          })
          .catch((errorInFindingTeacher) => {
            reject(
                RejectResponseMessage(
                    "unable to find teachers",
                    503,
                    errorInFindingTeacher
                )
            );
          });
    });
  },
  findTeacherByEmail(emailId) {
    return new Promise((resolve, reject) => {
      Teacher.findOne({ email: emailId })
          .then((teacher) => {
            if (!teacher) {
              reject(
                  RejectResponseMessage("No teacher found with this email id", 400)
              );
            }
            resolve(teacher);
          })
          .catch((err) => {
            reject(RejectResponseMessage("Unable to find teacher", 503, err));
          });
    });
  },
  async sendMailForPasswordUpdateTeacher(email){
    try{
      let TeacherDetails=await Teacher.findOne({email:email})
          .then((teacherDetails)=>{
            if(!teacherDetails){
              throw RejectResponseMessage("no teacher found",400)
            }
            return teacherDetails
          });
      const Token=await TokenHandler.encodeWithoutRole(TeacherDetails._id,60*30);
      const otp=await OtpDao.createNewOtp(Token.token);
      const MailStatus=await MailService.sendMailWithOutAttachment(TeacherDetails.email,"update password link",
          `
            link is active for 30 minutes only
            your otp is ${otp}
          <a href="http://localhost:8004/lms/api/authenticated/update/password/${Token.token}">click here to update password</a>
          `
      );
      return "mail sent";
    }catch (e) {
      throw RejectResponseMessage("unable to update password",503,e)
    }
  },
  /**
   * @return {string}
   */
  async PasswordUpdateOfTeacher(newPassword,token,otp){
    try{
      const decodedToken=await TokenHandler.decodeToken(token);
      // console.log(decodedToken.iat);
      await OtpDao.verifyOTP(token,otp);
      const updatedPassword=await Teacher.findByIdAndUpdate(decodedToken.token_details,{password:newPassword},{new:true});
      return "password updated";
    }catch (e) {
      return RejectResponseMessage("unable to update password",503,e)
    }
  }
};
