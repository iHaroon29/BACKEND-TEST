const Assignment = require("../models/assignments.model");
const Classroom = require("../models/classrooms.model");
const Course = require("../models/courses.model");
const ClassroomService = require("../services/classrooms.services");

const assignmentValidator = require("../utils/assignment.validators");

module.exports = {
  createAssignment(assignmentDetails) {
    return assignmentValidator
      .newAssignment(assignmentDetails)
      .then(async (validData) => {
        console.log(validData);
        let assignment = await Assignment.findOne({
          course_id: validData.course_id,
          teacher_id: validData.teacher_id,
        });
        if (assignment)
          throw {
            message: "Assignment already present",
            statusCode: 400,
            trace: "No trace Found",
          };

        let course = await Course.findOne({
          _id: validData.course_id,
        });
        if (!course)
          throw {
            message: "Course Doesnot exist",
            statusCode: 204,
            trace: "No trace Found",
          };
        console.log(course);

        return new Assignment(validData).save();
      });
  },

  updateAssignment(assignmentId, updateDetails) {
    return assignmentValidator
      .updateAssignmentDetails(updateDetails)
      .then((validDetails) => {
        return Assignment.findByIdAndUpdate(assignmentId, validDetails, {
          new: true,
        }).then((updatedDetails) => {
          return updatedDetails;
        });
      });
  },
  async deleteAssignmentById(assignmentId) {
    let assignment = await Assignment.findOne({ _id: assignmentId });
    if (!assignment) throw "Given Id not found";

    const deletedAssignment = await Assignment.findByIdAndDelete(assignmentId);
    return deletedAssignment;
  },

  getAllAssignments() {
    return Assignment.find().then((assignments) => {
      return assignments;
    });
  },

  async getAssignmentById(assignmentId) {
    let assignment = await Assignment.findOne({ _id: assignmentId });
    if (!assignment) throw "Given Id not found";

    return assignment;
  },

  async getAllAssignmentOfAClassroom(classroomId) {
    let classroom = await Classroom.findOne({ _id: classroomId });
    if (!classroom) throw "No such classroom for this id";

    const courses = await ClassroomService.getAllCoursesInClassroom(
      classroomId
    );
    let allCourses = Object.keys(courses);

    if (allCourses.length === 0)
      throw "There is no course available for this classroom";

    let arr = [];
    for (let i = 0; i < allCourses.length; i++) {
      let assignment = await Assignment.findOne({ course_id: allCourses[i] });
      if (assignment) arr.push(assignment);
    }

    if (arr.length === 0)
      throw "There is no assignment alloted in any course of this classroom";
    return arr;
  },
};
