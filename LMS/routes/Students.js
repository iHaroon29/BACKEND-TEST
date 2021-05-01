const router = require("express").Router();
const CourseSections = require("../models/courseSections");
require("./RouteMiddlewares");
const op = require("sequelize");

const bcrypt = require("bcrypt");
const Student = require("../models/students");

router.get("/", (req, res) => {
  CourseSections.findAll()
    .then((data) => {
      return res.send(data).status(202);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/", async (req, res) => {
  const students = await Student.findAll();
  res.send(students);
});

router.post("/", async (req, res) => {
  let student = await Student.findOne({ where: { email: req.body.email } });
  if (student) return res.status(400).send("Student already registered");

  student = await Student.create({
    name: req.body.name,
    email: req.body.email,
    parent_name: req.body.parent_name,
    status: req.body.status,
    active: req.body.active,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  student.password = await bcrypt.hash(student.password, salt);
  await student.save();
  console.log(student);
  res.send(student);
});

router.put("/edit/:id", async (req, res) => {
  const student = await Student.findOne({ where: { id: req.params.id } });
  if (!student) return res.status(400).send("Invalid student");

  student.name = req.body.name;
  student.parent_name = req.body.parent_name;
  student.status = req.body.status;
  student.active = req.body.active;
  student.password = req.body.password;

  const salt = await bcrypt.genSalt(10);
  student.password = await bcrypt.hash(student.password, salt);
  await student.save();
  console.log(student);
  res.send(student);
});

router.delete("/delete/:id", async (req, res) => {
  const student = await Student.findOne({ where: { id: req.params.id } });
  await student.destroy();
  res.send(student);
});

module.exports = router;
