const router = require("express").Router();

const {
  createNewTeacher,
  editTeacher,
  getAllAssignment,
  getAllSubmittedAssignmentsOfClass,
  getAssignmentOfACourse,
  createAssignment,
  lectureFeedbackyTeachers,
  updateAssignment,
} = require("../controllers/TeacherController");

router.post("/register", createNewTeacher);

router.put("/edit/:id", editTeacher);

router.get("/assignment", getAllAssignment);

router.get("/assignmentSubmission", getAllSubmittedAssignmentsOfClass);

router.get("/assignmentSubmission/:id", getAssignmentOfACourse);

router.post("/assignment/new", createAssignment);

router.put("/assignment/update/:id", updateAssignment);

router.post("/lectureFeedback/:id", lectureFeedbackyTeachers);

module.exports = router;
