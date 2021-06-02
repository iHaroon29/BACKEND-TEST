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

const {
  getAllCourse,
  getCourseWithId,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/CourseController");

router.get("/courseSections", getCourseSection);

router.get("/allStudents", getEnrolledStudents);

router.post("/assSubmit", assignmentSubmit);

router.get("/ass/classroom/:id", getAllAssignmentClassID);

router.get("/subass/stu/:id", getAllAssignmentStudentID);

router.post("/", createStudent);

router.delete("/delete/:id", deleteStudent);

router.post("/lectureFeedback/:id", lectureFeedbackByStudent);

router.get("/getAllCourse", getAllCourse);

router.get("/getCourse/:id", getCourseWithId);

router.post("/newCourse", createCourse);

router.put("/update/course/:id", updateCourse);

router.delete("/delete/course/:id", deleteCourse);

module.exports = router;
