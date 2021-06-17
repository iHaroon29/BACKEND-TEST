const Assignment = require("../../models/mongodb/assignments");
const Student = require("../../models/mongodb/students");
const CourseSections = require("../../models/mongodb/courseSections");
const bcrypt = require("bcrypt");
const Classroom = require("../../models/mongodb/classrooms");
const AssignmentSubmission = require("../../models/mongodb/assignmentSubmissions");

exports.getCourseSection = async (req, res) => {
  let courseSections = await CourseSections.find();
  if (!courseSections)
    return res.status(404).send("No such course Section exists");
  res.send(courseSections);
};

exports.getEnrolledStudents = async (req, res) => {
  const students = await Student.find();
  res.send(students);
};

exports.assignmentSubmit = async (req, res) => {
  let assignment = await Assignment.findOne({ _id: req.body.assignment_id });
  if (!assignment)
    return res.status(400).send("This assignment is not eligible now");

  assignmentSubmission = new AssignmentSubmission({
    assignment_id: req.body.assignment_id,
    student_id: req.body.student_id,
    answer_text: req.body.answer_text,
    comments: req.body.comments,
    status: req.body.status,
  });

  await assignmentSubmission.save();
  console.log(assignmentSubmission);
  res.send(assignmentSubmission);
};

exports.getAllAssignmentClassID = async (req, res) => {
  let classroom = await Classroom.findOne({ _id: req.params.id });
  if (!classroom) return res.status(400).send("No such classroom for this id");
  let allCourses = Object.keys(classroom.courses);

  if (allCourses.length === 0)
    return res
      .status(404)
      .send("There is no couse available in this classroom");

  let arr = [];
  for (let i = 0; i < allCourses.length; i++) {
    let assignment = await Assignment.findOne({ course_id: allCourses[i] });
    if (assignment) arr.push(assignment);
  }

  if (arr.length === 0)
    return res
      .status(404)
      .send("There is no assignment alloted in any course of this classroom");
  res.status(202).send(arr);
};

exports.getAllAssignmentStudentID = async (req, res) => {
  let allAssignment = await AssignmentSubmission.find({
    student_id: req.params.id,
  });
  if (!allAssignment) return res.status(404).send("No Submitted Assignment");

  console.log(allAssignment);
  res.send(allAssignment);
};

exports.createStudent = async (req, res) => {
  let student = await Student.findOne({ email: req.body.email });
  if (student) return res.status(400).send("student already registered");

  student = await Student.create({
    name: req.body.name,
    email: req.body.email,
    parent_name: req.body.parent_name,
    parent_relation: req.body.parent_relation,
    active: req.body.active,
    parent_email: req.body.parent_email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  student.password = await bcrypt.hash(student.password, salt);
  await student.save();
  console.log(student);
  res.send(student);
};

exports.deleteStudent = async (req, res) => {
  const student = await Student.deleteOne({ _id: req.params.id });
  if (!student) return res.status(404).send("Given ID was not found"); //404 is error not found

  res.send(student);
};

exports.lectureFeedbackByStudent = async (req, res) => {
  let lectureFeedback = await LectureFeedback.find({
    lecture_id: req.params.id,
  });
  if (!lectureFeedback) {
    lectureFeedback = new LectureFeedback({
      lecture_id: req.params.id,
    });
  }
  lectureFeedback.students_feedback = req.body.students_feedback;

  await lectureFeedback.save();
  console.log(lectureFeedback);
  res.send(lectureFeedback);
};
