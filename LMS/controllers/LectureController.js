const Lectures = require("../../models/mongodb/lectures");
const CourseSection = require("../../models/mongodb/courseSections");
const Course = require("../../models/mongodb/courses");

exports.createLecture = async function (req, res) {
  let lectures = await Lectures.findOne({
    course_id: req.body.course_id,
    classroom_id: req.body.classroom_id,
    course_section: req.body.course_section,
  });
  if (lectures) return res.status(400).send("lectures already present");

  let classroom = await Course.findOne({
    _id: req.body.course_id,
    classroom_id: req.body.classroom_id,
  });
  if (!classroom)
    return res.status(400).send("classroom not present for this course");

  let course = await CourseSection.findOne({
    course_id: req.body.course_id,
  });
  if (!course)
    return res.status(400).send("Course Sec not present in this course");

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
};
