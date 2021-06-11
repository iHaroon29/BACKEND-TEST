const Student = require("../../models/mongodb/students");
const Classroom = require("../../models/mongodb/classrooms");
const StudentValidator = require("../../utils/Students.validators");
const bcrypt = require("bcrypt");

module.exports = {
  addNewStudent(studentDetails) {
    return StudentValidator.newStudent(studentDetails).then(
      async (validData) => {
        let student = await Student.findOne({ email: validData.email });
        if (student) throw "Student already Registered";

        student = new Student(validData);

        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(student.password, salt);
        await student.save();
        return student;
      }
    );
  },
  addNewStudentsUsingExcelSheet() {},
  async getAllStudentsAndTheirCourseDetails() {
    let student = await Student.find();
    if (student.length === 0) throw "No Student Found";
    console.log(student.length);

    let studentCourse = [];

    for (let i = 0; i < student.length; i++) {
      const studentID = student[i]._id;
      const StudentData = {};
      StudentData["enrolled_students." + studentID] = {
        $exists: true,
      };
      let classroom = await Classroom.find(StudentData);
      if (classroom.length === 0) throw "no classroom found;";
      let classrooms = [];
      for (let j = 0; j < classroom.length; j++)
        classrooms.push(classroom[j].name);
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
};
