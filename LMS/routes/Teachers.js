const router = require("express").Router();
const Assignment = require("../models/mongodb/assignments");
const AssignmentSubmission = require("../models/mongodb/assignmentSubmissions");
const LectureFeedback = require("../models/mongodb/lectureFeedback");
const Teacher = require("../models/mongodb/teachers");
const { NewAssignment } = require("./DataValidators");

const bcrypt = require("bcrypt");
const assignmentSubmissions = require("../models/mongodb/assignmentSubmissions");

//POST new teacher
router.post("/register", async (req, res) => {
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
});

//Edit teacher
router.put("/edit/:id", async (req, res) => {
  let teacher = await Teacher.find({ _id: req.params.id });
  if (!teacher) return res.status(404).send("Given ID was not found");

  teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  await teacher.save();
  console.log(teacher);
  res.send(teacher);
});

//GET All assignments given by Teacher
router.get("/", (req, res) => {
  Assignment.find()
    .then((data) => {
      return res.send(data).status(202);
    })
    .catch((err) => {
      console.log(err);
    });
});

//GET All assignments submitted given by Student
router.get("/assignmentSubmission", async (req, res) => {
  const submitted = await AssignmentSubmission.find();

  res.send(submitted);
});

//GET assignment submitted given by a Student with ID
router.get("/assignmentSubmission/:id", async (req, res) => {
  let assignments = await Assignment.find({
    course_id: req.params.id,
  });
  if (!assignments) return res.status(400).send("Invalid course ID");
  //start a loop for each assignment

  let result = await AssignmentSubmission.find();

  let submitted = [];

  for (let i = 0; i < assignments.length; i++) {
    for (let j = 0; j < result.length; j++) {
      if (assignments[i]._id.equals(result[j].assignment_id)) {
        submitted.push(result[j]);
      }
    }
  }
  console.log(submitted);
  res.send(submitted);
  //use _id and student id to find one submitted assignment and repeat it for each assignment
});

//POST new assignment by teacher
router.post("/assignment/new", async (req, res) => {
  let result = await NewAssignment(req.body)
    .then((data) => {
      console.log("data", data);
      res.send(data);
    })
    .catch((err) => {
      console.log("err ", err);
    });

  console.log(req.body);
  const assignment = new Assignment({
    course_id: req.body.course_id,
    teacher_id: req.body.teacher_id,
    instructions: req.body.instructions,
    description: req.body.description,
    last_submission_date: req.body.last_submission_date,
  });
  try {
    await assignment.save();
    console.log(assignment);
    res.send(assignment);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

//PUT Update a assignment given by a teacher

router.put("/assignment/update/:id", async (req, res) => {
  const assignment = await Assignment.findOne({ _id: req.params.id });
  if (!assignment) return res.status(400).send("Invalid Assignment");

  {
    (assignment.course_id = req.body.course_id),
      (assignment.teacher_id = req.body.teacher_id),
      (assignment.instructions = req.body.instructions),
      (assignment.description = req.body.description),
      (assignment.last_submission_date = req.body.last_submission_date);
  }

  await assignment.save();
  console.log(assignment);
  res.send(assignment);
});

router.post("/lectureFeedback", async (req, res) => {
  const lectureFeedback = new LectureFeedback({
    lecture_id: req.body.lecture_id,
    teachers_feedback: req.body.teachers_feedback,
  });

  await lectureFeedback.save();
  console.log(lectureFeedback);
  res.send(lectureFeedback);
});

module.exports = router;
