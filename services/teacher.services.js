const Teacher = require("../models/teachers.model");
const teacherValidator = require("../utils/Teacher.validators");
const CourseService = require("./course.services");
const ClassroomCourseService = require("./classroom.course.services");
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
    return new Promise((resolve, reject) => {
      Teacher.find()
        .then(async (teachers) => {
          const teacherFullDetails = [];
          for (let teacher of teachers) {
            teacherFullDetails.push(
              await this.getTeacherPersonalDetailById(teacher._id)
                .then((teacherDetails) => teacherDetails)
                .catch()
            );
          }
          resolve(teacherFullDetails);
        })
        .catch((err) => {
          reject({
            message: "Unable to find Teacher",
            statusCode: 503,
            trace: err,
          });
        });
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
              reject({
                message: "Unable to find courses",
                statusCode: 503,
                trace: err,
              });
            });
        })
        .catch((err) => {
          reject({
            message: "Unable to find Teacher",
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
          reject({
            trace: errorInFindingTeacher,
            statusCode: 503,
          });
        });
    });
  },
  findTeacherByEmail(emailId) {
    return new Promise((resolve, reject) => {
      Teacher.findOne({ email: emailId })
        .then((teacher) => {
          if (!teacher) {
            reject({
              message: "No teacher found with this email id",
              statusCode: 400,
              trace: "No trace available",
            });
          }
          resolve(teacher);
        })
        .catch((err) => {
          reject({
            statusCode: 503,
            message: "Unable to find teacher",
            trace: err,
          });
        });
    });
  },
};
