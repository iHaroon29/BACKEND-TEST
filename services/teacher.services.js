const Teacher = require("../models/mongodb/teachers");
const teacherValidator = require("../utils/Teacher.validators");
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
    return Teacher.find().then((teachers) => {
      return teachers;
    });
  },
  updateTeacherPersonalDetailsById() {},
  async deleteTeacherById(teacherId) {
    let teacher = await Teacher.findOne({ _id: teacherId });
    if (!teacher) throw "Given Id not found";

    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
    return deletedTeacher;
  },
  async getTeacherPersonalDetailById(teacherId) {
    let teacher = await Teacher.findOne({ _id: teacherId });
    if (!teacher) throw "Given Id not found";

    return teacher;
  },
  getTeacherActivityById() {},
};
