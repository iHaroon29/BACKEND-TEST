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

router.get("/course/section/all", getCourseSection);

router.get("/student/all", getEnrolledStudents);

router.post("/assignment/submitted", assignmentSubmit);

router.get("/classroom/:id/assignment/all", getAllAssignmentClassID);

router.get("/student/:id/assignment/submitted/all", getAllAssignmentStudentID);

router.post("/student/new", createStudent);

router.delete("/student/delete/:id", deleteStudent);

router.post("/feedback/lecture/:id", lectureFeedbackByStudent);

router.get("/course/all", getAllCourse);

router.get("/course/:id", getCourseWithId);

router.post("/course/new", createCourse);

router.put("/course/update/:id", updateCourse);

router.delete("/course/delete/:id", deleteCourse);

router.use(require("../../routes/student.courses.api"));
module.exports = router;
