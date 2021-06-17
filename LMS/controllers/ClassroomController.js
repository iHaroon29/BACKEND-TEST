const Course = require("../../models/mongodb/courses");
const Classroom = require("../../models/mongodb/classrooms");


exports.getAllClassroom = async (req, res) => {
    const submitted = await AssignmentSubmission.find();
    res.send(submitted);
};

exports.classroomWithGivenId = async (req, res) => {
    const classroom = await Classroom.findOne({ where: { id: req.params.id } });
    if (!classroom) return res.status(400).send("Invalid Classroom");
    res.send(classroom);
};

exports.createNewClassroom = async (req, res) => {
    let classroom = await Classroom.findOne({ where: { name: req.body.name } });
    if (classroom) return res.status(400).send("Classroom already registered");
  
    classroom = await Classroom.create({
      name: req.body.name,
      status: req.body.status,
    });
  
    await classroom.save();
    console.log(classroom);
    res.send(classroom);
};
exports.addCourseInClassroom = async (req, res) => {
    let classroom = await Classroom.findOne({ _id: req.params.id });
    if (!classroom) return res.status(404).send("Given ID was not found");
    console.log(req.body);

    let course = await Course.findOne({ _id: req.body.course_id });
    if (!course) return res.status(400).send("This course id is not found in db");
    classroom.courses[req.body.course_id] = course;
    classroom.markModified("courses");
    await classroom.save();
    res.send(classroom);
};
exports.deleteClassroomWithGivenId = async (req, res) => {
    const classroom = await Classroom.deleteOne({ _id: req.params.id });
    if (!classroom) return res.status(404).send("Given ID was not found"); //404 is error not found
    res.send(classroom);
};

