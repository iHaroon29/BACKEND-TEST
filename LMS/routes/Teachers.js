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

router.put("/assignment/update", (req, res) => {
  return res.send("updateAssignmentFile").status(202);
});

module.exports = router;
