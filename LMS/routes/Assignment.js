const router = require("express").Router();
// const Assignment  = require('../models/assignments');

router.get("/", async (req, res) => {
  const assignments = await Assignment.findAll();
  res.send(assignments);
});

router.get("/:id", async (req, res) => {
  const assignment = await Assignment.findOne({ where: { id: req.params.id } });
  if (!assignment) return res.status(400).send("Invalid Assignment");

  res.send(assignment);
});

router.post("/", async (req, res) => {
  let assignment = await Assignment.findOne({ where: { name: req.body.name } });
  if (assignment) return res.status(400).send("Assignment already registered");

  assignment = await Assignment.create({
    title: req.body.title,
    instructions: req.body.instructions,
    last_submission_date: req.body.last_submission_date,
    question_file: req.body.question_file,
  });

  await assignment.save();
  console.log(assignment);
  res.send(assignment);
});

router.put("/edit/:id", async (req, res) => {
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

router.delete("/delete/:id", async (req, res) => {
  const assignment = await Assignment.findOne({ where: { id: req.params.id } });
  await assignment.destroy();
  res.send(assignment);
});

module.exports = router;
