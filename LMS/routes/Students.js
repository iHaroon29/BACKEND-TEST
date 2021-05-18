const router = require("express").Router();

const {
  getEnrolledStudents,
  assignmentSubmit,
  getAllAssignmentClassID,
  getAllAssignmentStudentID,
  createStudent,
  deleteStudent,
  lectureFeedbackByStudent,
  getCourseSection,
} = require("../controllers/StudentController");

router.get("/courseSections", getCourseSection);

router.get("/allStudents", getEnrolledStudents);

router.post("/assSubmit", assignmentSubmit);

router.get("/ass/classroom/:id", getAllAssignmentClassID);

router.get("/subass/stu/:id", getAllAssignmentStudentID);

router.post("/", createStudent);

router.delete("/delete/:id", deleteStudent);

router.post("/lectureFeedback/:id", lectureFeedbackByStudent);

module.exports = router;
