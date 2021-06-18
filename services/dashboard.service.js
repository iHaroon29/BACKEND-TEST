const Student = require("../models/students.model");
const Classroom = require("../models/classrooms.model");
const Teacher = require("../models/teachers.model");
const Lecture = require("../models/lectures.model");

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
