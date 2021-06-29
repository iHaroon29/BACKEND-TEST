const Classroom = require("../models/classrooms.model");
const ClassroomService = require("./classrooms.services");
const ClassroomCourseService = require("./classroom.course.services");
const Students = require("../models/students.model");

module.exports = {
  addCourseToStudentClassroom(studentId, courseId) {
    const filter = {};
    filter["enrolled_students." + studentId] = {
      $exists: true,
    };
    return Classroom.find(filter).then((classrooms) => {
      if (classrooms.length < 1) {
        console.log("error");
        throw new Error("No classroom found for the student");
        // console.log("classrooms");
        // (async ()=>{
        //     classrooms[0]=await ClassroomService.addNewClassroom({name:"DIPU KUMAR SAH",students:[studentId]});
        // })()
      }
      return (async () => {
        try {
          for (let i = 0; i < classrooms.length; i++) {
            classrooms[i] = await ClassroomService.addCourseInClassroom(
              classrooms[i]._id,
              courseId
            );
          }
          console.log(classrooms);
          return classrooms;
        } catch (e) {
          throw new Error(e);
        }
      })();
    });
  },
  removeCourseFromStudentClassroom(studentId, courseId) {
    const filter = {};
    filter["enrolled_students." + studentId] = {
      $exists: true,
    };
    return Classroom.find(filter).then((classrooms) => {
      return (async () => {
        try {
          for (let i = 0; i < classrooms.length; i++) {
            classrooms[i] =
              await ClassroomCourseService.removeCourseFromClassroom(
                classrooms[i]._id,
                courseId
              );
          }
          return classrooms;
        } catch (e) {
          throw new Error(e);
        }
      })();
    });
  },
  getStudentsDetailsWithCourseDetails() {
    return new Promise((resolve, reject) => {
      Students.find()
        .then((allStudents) => {
          allStudents = JSON.parse(JSON.stringify(allStudents));
          (async () => {
            try {
              for (let i = 0; i < allStudents.length; i++) {
                allStudents[i].classrooms =
                  await ClassroomCourseService.getAllClassroomByStudentId(
                    allStudents[i]._id
                  );
              }
              resolve(allStudents);
            } catch (e) {
              reject({
                message: "unable to find all student details ",
                statusCode: 503,
                trace: e,
              });
            }
          })();
        })
        .catch((e) => {
          console.log(e);
          reject({
            message: "unable to find all student details ",
            statusCode: 503,
            trace: e,
          });
        });
    });
  },
};
