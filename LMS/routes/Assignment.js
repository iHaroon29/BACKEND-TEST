const router = require("express").Router();
const Assignment = require("../models/mongodb/assignments");
const { AssignmentSubmissionComments } = require("./DataValidators");
const fileUpload=require("../modules/fileUploads");

router.get("/", async (req, res) => {
  const assignments = await Assignment.find();
  res.send(assignments);
});

router.get("/:id", async (req, res) => {
  const assignment = await Assignment.findOne({ where: { id: req.params.id } });
  if (!assignment) return res.status(400).send("Invalid Assignment");

  res.send(assignment);
});

router.post("/",fileUpload.fields([{name:"pipe",count:1}]), async (req, res) => {
  req.body.pipe = req.files.pipe[0];
  
  let assignment = await Assignment.findOne({ where: { name: req.body.name } });
  if (assignment) return res.status(400).send("Assignment already registered");

  assignment = await Assignment.create({
    course_id: req.body.course_id,
    teacher_id: req.body.teacher_id,
    title: req.body.title,
    description: req.body.description,
    instructions: req.body.instructions,
    files: req.body.pipe
  });

  await assignment.save();
  console.log(assignment);
  res.send(assignment);
});

router.put("/edit/:id", fileUpload.fields([{name:"pipe",count:1}]), async (req, res) => {
  let assignment = await Assignment.find({ _id: req.params.id });
  if (!assignment) return res.status(404).send("Given ID was not found");
  assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  await assignment.save();
  console.log(assignment);
  res.send(assignment);
});

router.delete("/delete/:id", async (req, res) => {
  const assignment = await Assignment.deleteOne({ _id: req.params.id });
  if (!assignment) return res.status(404).send("Given ID was not found"); //404 is error not found

  res.send(Assignment);
});

module.exports = router;
