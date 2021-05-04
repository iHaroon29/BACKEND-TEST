const router = require("express").Router();
const Assignment = require("../models/mongodb/assignments");
const AssignmentSubmission = require("../models/mongodb/assignmentSubmissions");
const LectureFeedback = require("../models/mongodb/lectureFeedback");
const { NewAssignment } = require("./DataValidators");

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
  const assignment = await AssignmentSubmission.findOne({ id: req.params.id });
  if (!assignment) return res.status(400).send("Invalid Assignment ID");

  res.send(assignment);
});

//POST new assignment by teacher
router.post("/assignment/new", async (req, res) => {
  const result = NewAssignment(req.body)
    .then((data) => {
      console.log("data", data);
      res.send(data);
    })
    .catch((err) => {
      console.log("err ", err);
    });
  console.log(result);
  console.log(req.body);
  const assignment = new Assignment(
    // result
    {
      course_id: req.body.course_id,
      teacher_id: req.body.teacher_id,
      instructions: req.body.instructions,
      description: req.body.description,
      last_submission_date: req.body.last_submission_date,
    }
  );

  await assignment.save();
  console.log(assignment);
  res.send(assignment);
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
    //teachers_feedback: req.body.teachers_feedback,
  });

  await lectureFeedback.save();
  console.log(lectureFeedback);
  res.send(lectureFeedback);
});

module.exports = router;
