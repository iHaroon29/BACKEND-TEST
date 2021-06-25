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
  createNewNotes,
  deleteNote,
  getAllNotes,
  deleteAssignment,
} = require("../controllers/TeacherController");

const {
  getAllClassroom,
  classroomWithGivenId,
  createNewClassroom,
  addCourseInClassroom,
  deleteClassroomWithGivenId,
} = require("../controllers/ClassroomController");

const {
  getAllSubmittedAssignment,
  AssignmentSubmissionWithId,
} = require("../controllers/AssignmentSubmissionController");

const { createLecture } = require("../controllers/LectureController");

const {
  createCourseSection,
} = require("../controllers/CourseSectionController");

const {
  createLecAttendance,
} = require("../controllers/LectureAttendanceController");

const {
  createCourseMaterial,
} = require("../controllers/CourseMaterialController");

const {
  newCourseActivity,
} = require("../controllers/CourseActivityController");

router.post("/register", createNewTeacher);

router.put("/edit/:id", editTeacher);

router.get("/assignment", getAllAssignment);

router.get("/assignmentSubmission", getAllSubmittedAssignmentsOfClass);

router.get("/assignmentSubmission/:id", getAssignmentOfACourse);

router.post("/assignment/new", createAssignment);

router.put("/assignment/update/:id", updateAssignment);

router.delete("/assignment/delete/:id", deleteAssignment);

router.post("/lectureFeedback/:id", lectureFeedbackyTeachers);

router.post("/createCourseSection", createCourseSection);

router.post("/createLecAttendance", createLecAttendance);

router.post("/createLecture", createLecture);

router.post("/createCourseMaterial", createCourseMaterial);

router.post("/newCourseActivity", newCourseActivity);

router.get("/allAssignmentSubmissions", getAllSubmittedAssignment);

router.get("/AssignmentSubmitted/:id", AssignmentSubmissionWithId);

router.get("/allClassroom", getAllClassroom);

router.get("/classroomId/:id", classroomWithGivenId);

router.post("/addClassroom", createNewClassroom);

router.put("/addCourse/inClassroomId/:id", addCourseInClassroom);

router.delete("/deleteClassroomId/:id", deleteClassroomWithGivenId);

router.post("/addNote", createNewNotes);

router.delete("/deleteNote/:id", deleteNote);

router.get("/note/all", getAllNotes);

module.exports = router;
