const CourseSection = require("../../models/mongodb/courseSections");
const Course = require("../../models/mongodb/courses");

exports.createCourseSection = async function (req, res) {
  let courseid = await Course.findOne({ _id: req.body.course_id });
  if (!courseid) return res.status(404).send("This course id doesn't exist");

  let courseSection = await CourseSection.findOne({
    name: req.body.name,
    course_id: req.body.course_id,
  });

  if (courseSection)
    return res.status(400).send("This courseSection Already exist");

  courseSection = await CourseSection.create({
    course_id: req.body.course_id,
    name: req.body.name,
    description: req.body.description,
    is_active: req.body.is_active,
  });

  await courseSection.save();
  console.log(courseSection);
  res.send(courseSection);
};
