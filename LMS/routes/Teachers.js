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

router.post("/teacher/new", createNewTeacher);

router.put("/teacher/update/:id", editTeacher);

router.get("/assignment/all", getAllAssignment);

router.get("/assignment/submission", getAllSubmittedAssignmentsOfClass);

router.get("/assignment/submission/:id", getAssignmentOfACourse);

router.post("/assignment/new", createAssignment);

router.put("/assignment/update/:id", updateAssignment);

router.post("/lectureFeedback/:id", lectureFeedbackyTeachers);

router.post("/course/section/new", createCourseSection);

router.post("/attendance/lecture/new", createLecAttendance);

router.post("/lecture/new", createLecture);

router.post("/course/material/new", createCourseMaterial);

router.post("/course/activity", newCourseActivity);

router.get("/assignment/submissions/all", getAllSubmittedAssignment);

router.get("/assignment/submitted/:id", AssignmentSubmissionWithId);

router.get("/classroom/all", getAllClassroom);

router.get("/classroomId/:id", classroomWithGivenId);

router.post("/classroom/new", createNewClassroom);

router.put("/classroom/:id/course", addCourseInClassroom);

router.delete("/classroom/id/:id", deleteClassroomWithGivenId);

module.exports = router;
