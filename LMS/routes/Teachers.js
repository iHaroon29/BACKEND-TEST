const router = require("express").Router();
const Assignment = require("../models/mongodb/assignments");
const { NewAssignment } = require("./DataValidators");

router.get("/", (req, res) => {
  Assignment.find()
    .then((data) => {
      return res.send(data).status(202);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/assignment/new", async (req, res) => {
  const result = await NewAssignment(req.body)
    .then((data) => {
      console.log("data", data);
      res.send(data);
    })
    .catch((err) => {
      console.log("err ", err);
    });

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

router.put("/assignment/update/:id", async (req, res) => {
  const assignment = await Assignment.findOne({ where: { id: req.params.id } });
  if (!assignment) return res.status(400).send("Invalid Assignment");

  (assignment.title = req.body.title),
    (assignment.instructions = req.body.instructions),
    (assignment.last_submission_date = req.body.last_submission_date),
    (assignment.question_file = req.body.question_file);

  await assignment.save();
  console.log(assignment);
  res.send(assignment);
});

module.exports = router;
