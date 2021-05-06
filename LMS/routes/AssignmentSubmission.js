const router = require("express").Router();

<<<<<<< HEAD
// const AssignmentSubmission  = require('../models/assignmentSubmissions');

router.get("/", async (req, res) => {
  const submitted = await AssignmentSubmission.findAll();
  res.send(submitted);
=======
const AssignmentSubmission  = require('../models/mongodb/assignmentSubmissions');

router.get('/',async (req,res) => {
    const submitted = await AssignmentSubmission.find() ;
    res.send(submitted);
>>>>>>> 3a6ae8243c4e5f722d9f712be845d2d4f9706617
});

router.get("/:id", async (req, res) => {
  const assignment = await AssignmentSubmission.findOne({
    where: { id: req.params.id },
  });
  if (!assignment) return res.status(400).send("Invalid Assignment submission");

  res.send(assignment);
});

router.post("/", async (req, res) => {});

module.exports = router;
