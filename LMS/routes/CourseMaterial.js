const express = require("express");
const router = express.Router();
const CourseMaterial = require("../models/mongodb/courseMaterials");
const CourseSections = require("../models/mongodb/courseSections");

router.post("/", async function (req, res) {
  let courseMaterial = await CourseMaterial.findOne({
    name: req.body.name,
  });
  
  if (courseMaterial)
    return res.status(400).send("courseMaterial already present");

  const coursesection =  await CourseSections.findOne({ _id: req.body.course_section_id });
  if(!coursesection) return res.status(404).send("Given Course section not available");
  
  courseMaterial = await CourseMaterial.create({
    course_section_id: req.body.course_section_id,
    name: req.body.name,
    content: req.body.content,
    topic: req.body.topic,
    time_required: req.body.time_required,
    is_active: req.body.is_active,
  });

  await courseMaterial.save();
  console.log(courseMaterial);
  res.send(courseMaterial);
});

module.exports = router;
