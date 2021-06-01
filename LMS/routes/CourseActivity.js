const express = require("express");
const router = express.Router();
const CourseActivity = require("../../models/mongodb/courseActivities");

router.post("/", async function (req, res) {
  let courseActivity = await CourseActivity.findOne({
    course_id: req.body.course_id,
  });
  if (courseActivity)
    return res.status(400).send("courseActivity already registered");

  courseActivity = await CourseActivity.create({
    course_id: req.body.course_id,
    activity: req.body.activity,
  });

  await courseActivity.save();
  console.log(courseActivity);
  res.send(courseActivity);
});

module.exports = router;
