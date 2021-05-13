const express = require("express");
const router = express.Router();
const Lectures = require("../models/mongodb/lectures");

router.post("/", async function (req, res) {
  let lectures = await Lectures.findOne({
    course_id: req.body.course_id,
  });
  if (lectures) return res.status(400).send("lectures already present");

  lectures = await Lectures.create({
    classroom_id: req.body.classroom_id,
    course_id: req.body.course_id,
    course_section: req.body.course_section,
    date_and_time: req.body.date_and_time,
    is_attendance_marked: req.body.is_attendance_marked,
    crm_meeting_link: req.body.crm_meeting_link,
    status: req.body.status,
    is_active: req.body.is_active,
    reschedule_information: req.body.reschedule_information,
  });

  await lectures.save();
  console.log(lectures);
  res.send(lectures);
});

module.exports = router;