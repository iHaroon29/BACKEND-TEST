const AssignmentSubmission = require("../../models/assignment.submissions.model");
const Assignment = require("../../models/assignments.model");
const Notes = require("../../models/notes.model");
const LectureFeedback = require("../../models/lecture.feedbacks.model");
const Teacher = require("../../models/teachers.model");
const Course = require("../../models/courses.model");
const bcrypt = require("bcrypt");
const Validator = require("../routes/DataValidators");

exports.createNewTeacher = async (req, res) => {
  let teacher = await Teacher.findOne({ email: req.body.email });
  if (teacher) return res.status(400).send("Teacher already registered");

  teacher = new Teacher({
    name: req.body.name,
    primary_phone_number: req.body.primary_phone_number,
    email: req.body.email,
    password: req.body.password,
    last_seen: req.body.last_seen,
    country: req.body.country,
    zip_code: req.body.zip_code,
    address: req.body.address,
  });

  console.log(teacher);
  const salt = await bcrypt.genSalt(10);
  teacher.password = await bcrypt.hash(teacher.password, salt);
  await teacher.save();
  console.log(teacher);
  res.send(teacher);
};

exports.editTeacher = async (req, res) => {
  let teacher = await Teacher.find({ _id: req.params.id });
  if (!teacher) return res.status(404).send("Given ID was not found");

  teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  await teacher.save();
  console.log(teacher);
  res.send(teacher);
};

exports.getAllAssignment = async (req, res) => {
  const assignment = await Assignment.find();
  if (!assignment) return res.status(400).send("No Assignment Found");

  res.send(assignment);
};

exports.getAllSubmittedAssignmentsOfClass = async (req, res) => {
  const submitted = await AssignmentSubmission.find();
  if (!submitted) return res.status(400).send("No Submitted Assignment Found");

  res.send(submitted);
};

exports.getAssignmentOfACourse = async (req, res) => {
  let assignments = await Assignment.find({
    course_id: req.params.id,
  });

  if (!assignments) return res.status(400).send("Invalid course ID");
  if (assignments.length === 0)
    return res.status(404).send("NO Assignments in the given course Id");
  console.log(assignments);

  let submitted = [];

  for (let i = 0; i < assignments.length; i++) {
    let submitass = await AssignmentSubmission.findOne({
      assignment_id: assignments[i]._id,
    });
    if (submitass) submitted.push(submitass);
  }

  if (submitted.length === 0)
    return res
      .status(404)
      .send("NO Submitted Assignment in the given course Id");
  console.log(submitted.length);
  res.send(submitted);
  //use _id and student id to find one submitted assignment and repeat it for each assignment
};

exports.createAssignment = (req, res) => {
  Validator.NewAssignment(req.body)
    .then(async (validData) => {
      let assignment = await Assignment.findOne({
        course_id: validData.course_id,
        teacher_id: validData.teacher_id,
      });
      if (assignment) return res.status(400).send("Assignment already present");

      let course = await Course.findOne({
        _id: validData.course_id,
      });
      if (!course) return res.status(400).send("This Course Doesnot Exist");
      console.log(course);

      assignment = await Assignment.create(validData);

      await assignment.save();
      console.log(assignment);
      res.send(assignment);
    })
    .catch((e) => res.status(400).send(e));
};

exports.updateAssignment = async (req, res) => {
  const assignment = await Assignment.findOne({ _id: req.params.id });
  if (!assignment) return res.status(400).send("Invalid Assignment");

  assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  await assignment.save();
  console.log(assignment);
  res.send(assignment);
};

exports.lectureFeedbackyTeachers = async (req, res) => {
  let lectureFeedback = await LectureFeedback.find({
    lecture_id: req.params.id,
  });
  if (!lectureFeedback) {
    lectureFeedback = new LectureFeedback({
      lecture_id: req.params.id,
    });
  }
  lectureFeedback.teachers_feedback = req.body.teachers_feedback;

  await lectureFeedback.save();
  console.log(lectureFeedback);
  res.send(lectureFeedback);
};

exports.createNewNotes = (req, res) => {
  Validator.NewNotes(req.body)
    .then(async (validData) => {
      const newNote = await Notes.create(validData);

      await newNote.save();
      console.log(newNote);
      res.send(newNote);
    })
    .catch((e) => res.status(400).send(e));
};

exports.deleteNote = async (req, res) => {
  const note = await Notes.deleteOne({ _id: req.params.id });
  if (!note) return res.status(404).send("Given ID was not found"); //404 is error not found
  res.send(note);
};
