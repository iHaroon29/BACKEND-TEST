const Student = require("../../models/mongodb/students");
const Classroom = require("../../models/mongodb/classrooms");
const Teacher = require("../../models/mongodb/teachers");
const Lecture = require("../../models/mongodb/lectures");

module.exports = {
  async getDashboardData() {
    let student = await Student.find();
    let classroom = await Classroom.find();
    let teacher = await Teacher.find();
    let lecture = await Lecture.find();

    let data = {
      totalStudent: student.length,
      totalClassroom: classroom.length,
      totalTeacher: teacher.length,
      totalLectures: lecture.length,
    };

    return data;
  },
};
