const Assignment = require("../models/assignments.model");
const DAOError = require("../errors/dao.errors").getDAOErrorMessage;
const Classroom = require("./classroom.dao");
const Course = require("../models/courses.model");
const assignmentValidator = require("../validators/assignment.validators");

module.exports = {
  createAssignment(assignmentDetails) {
    return new Promise((resolve, reject) => {
      new Assignment(assignmentDetails)
        .save()
        .then((savedDetails) => {
          resolve(savedDetails);
        })
        .catch((error) => {
          reject(DAOError("unable to create assignment", 503, error));
        });
    });
  },

  getAllAssignments() {
    return new Promise((resolve, reject) => {
      Assignment.find()
        .then((allAssignments) => {
          resolve(allAssignments);
        })
        .catch((error) => {
          reject(DAOError("unable to get all assignments", 503, error));
        });
    });
  },

  removeAssignmentById(assignmentId) {
    return new Promise((resolve, reject) => {
      Assignment.findByIdAndDelete(assignmentId)
        .then((deletedAssignment) => {
          if (!deletedAssignment) {
            reject(DAOError("no assignment present", 400));
          }
          resolve(deletedAssignment);
        })
        .catch((error) => {
          reject(DAOError("unable to delete assignment", 503, error));
        });
    });
  },

  getAssigmnentById(assignmentId) {
    return new Promise((resolve, reject) => {
      Assignment.findById(assignmentId)
        .then((assignmentDetails) => {
          if (!assignmentDetails) {
            reject(DAOError("unable to find assignment", 400));
          }
          resolve(assignmentDetails);
        })
        .catch((error) => {
          reject(DAOError("unable to find assignment", 503, error));
        });
    });
  },

  updateAssignmentById(assignmentId, newAssignmentDetails) {
    return new Promise((resolve, reject) => {
      Assignment.findByIdAndUpdate(assignmentId, newAssignmentDetails, {
        new: true,
      })
        .then((updatedDetails) => {
          if (!assignmentId) {
            reject(DAOError("unable to find assignment", 400));
          }
          resolve(updatedDetails);
        })
        .catch((error) => {
          reject(DAOError("unable to update assignment", 503, error));
        });
    });
  },

  getAllAsignmentsOfAClassroom(classroomId) {
    return new Promise((resolve, reject) => {
      Classroom.getClassroomDetailsByClassroomId(classroomId)
        .then(async (classroomsDetails) => {
          classroomsDetails = JSON.parse(JSON.stringify(classroomsDetails));
          for (let course in classroomsDetails.enrolled_courses) {
            classroomsDetails.enrolled_courses[course] =
              await this.getAssignmentByCourseId(courseId).catch();
          }
          resolve(classroomsDetails);
        })
        .catch((error) => {
          reject(DAOError("unable to update assignment", 503, error));
        });
    });
  },
  getAssignmentByCourseId(courseId) {
    return new Promise((resolve, reject) => {
      Assignment.find({ course_id: courseId })
        .then((allAssignments) => {
          if (!allAssignments) {
            reject(DAOError("unable to find assignment", 400));
          }
          resolve(allAssignments);
        })
        .catch((error) => {
          reject(DAOError("unable to update assignment", 503, error));
        });
    });
  },
};
