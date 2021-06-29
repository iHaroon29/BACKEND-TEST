const Classroom = require("../models/classrooms.model");
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
        const teachers = {};
        for (let i of validClassroomDetails.teachers) {
          if (!teachers[i])
            teachers[i] = {
              createdAt: new Date(),
            };
        }
        validClassroomDetails.teachers = teachers;
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

  getAllCoursesInClassroom(classroomId) {
    return Classroom.findById(classroomId).then((classroomData) => {
      return classroomData.enrolled_courses;
    });
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
  addCourseInClassroom(classroomId, courseId) {
    return Classroom.findById(classroomId).then((classroom) => {
      if (classroom.enrolled_courses[courseId]) {
        throw new Error("Already enrolled in course");
      }
      classroom.enrolled_courses[courseId] = { createdAt: new Date() };
      return Classroom.findByIdAndUpdate(
        classroomId,
        { enrolled_courses: classroom.enrolled_courses },
        { new: true }
      );
    });
  },
  deleteCourseFromClassroom(classroomId, courseId) {
    return Classroom.findById(classroomId).then((classroom) => {
      if (!classroom.enrolled_courses[courseId]) {
        throw new Error("Not enrolled in course");
      }
      delete classroom.enrolled_courses[courseId];
      return Classroom.findByIdAndUpdate(
        classroomId,
        { enrolled_courses: classroom.enrolled_courses },
        { new: true }
      );
    });
  },
};
