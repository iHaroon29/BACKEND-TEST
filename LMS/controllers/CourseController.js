const Teacher = require("../../models/mongodb/teachers");
const bcrypt = require("bcrypt");
const Course = require("../../models/mongodb/courses");

exports.getAllCourse = async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
};

exports.getCourseWithId = async (req, res) => {
  const course = await Course.findOne({ where: { id: req.params.id } });
  if (!course) return res.status(400).send("Invalid course");
  res.send(course);
};

exports.createCourse = async (req, res) => {
  let course = await Course.findOne({ title: req.body.title });
  if (course) return res.status(400).send("course already registered");

  if (req.body.teacher_id) {
    let teacher = await Teacher.findOne({ _id: req.body.teacher_id });
    if (!teacher)
      return res.status(400).send("This teacher id is not found in db");

    course = await Course.create({
      classroom_id: req.body.classroom_id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount,
      is_active: req.body.is_active,
      teachers: {
        [req.body.teacher_id]: teacher,
      },
    });
  } else {
    course = await Course.create({
      classroom_id: req.body.classroom_id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount,
      is_active: req.body.is_active,
    });
  }
  await course.save();
  console.log(course);
  res.send(course);
};

exports.updateCourse = async (req, res) => {
  let course = await Course.find({ _id: req.params.id });
  if (!course) return res.status(404).send("Given ID was not found");

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  await course.save();
  console.log(course);
  res.send(course);
};

exports.deleteCourse = async (req, res) => {
  const course = await Course.deleteOne({ _id: req.params.id });
  if (!course) return res.status(404).send("Given ID was not found"); //404 is error not found

  res.send(course);
};
