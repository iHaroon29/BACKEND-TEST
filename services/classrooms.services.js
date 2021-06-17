const Classroom = require("../models/mongodb/classrooms");
const ClassroomValidator = require("../utils/classroom.validators");

module.exports = {
  addNewClassroom(classroomDetails) {
    return ClassroomValidator.newClassroom(classroomDetails).then(
      (validClassroomDetails) => {
        const courses = {};
        for (let i of validClassroomDetails.courses) {
          if (!courses[i])
            courses[i] = {
              createdAt: new Date(),
            };
        }

        delete validClassroomDetails.courses;
        validClassroomDetails.enrolled_courses = courses;
        const students = {};
        for (let i of validClassroomDetails.students) {
          if (!students[i])
            students[i] = {
              createdAt: new Date(),
            };
        }

        delete validClassroomDetails.students;
        validClassroomDetails.enrolled_students = students;
        console.log(validClassroomDetails);
        return new Classroom(validClassroomDetails)
          .save()
          .then((savedDetails) => {
            console.log(savedDetails);
            return savedDetails;
          });
      }
    );
  },
  deleteClassroomById(classroomId) {
    return Classroom.findByIdAndDelete(classroomId).then((deletedData) => {
      return deletedData;
    });
  },
  updateClassroomById(classroomId, updateDetails) {
    return ClassroomValidator.updateClassroomDetails(updateDetails).then(
      (validDetails) => {
        return Classroom.findByIdAndUpdate(classroomId, validDetails, {
          new: true,
        }).then((updatedDetails) => {
          return updatedDetails;
        });
      }
    );
  },
  getClassroomActivitiesByClassroomId(classroomId) {},
  getAllClassroom() {
    return Classroom.find();
  },
  addNewDemoClassTeacherToClass(classroomId, teacherId) {
    return Classroom.findById(classroomId).then((classroomDetails) => {
      if (classroomDetails.demo_class[teacherId]) {
        throw new Error(
          "A teacher already present for demo class remove it first"
        );
      }
      const demoClass = {};
      demoClass[teacherId] = { created_at: new Date() };
      return Classroom.findByIdAndUpdate(
        classroomId,
        {
          demo_class: demoClass,
        },
        { new: true }
      ).then((savedDetails) => {
        return savedDetails;
      });
    });
  },
};
