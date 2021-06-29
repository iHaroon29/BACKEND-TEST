const router = require("express").Router();
const TeachersController = require("../../controllers/teachers.controller");
const NoteController = require("../../controllers/notes.controller");
const AssignmentController = require("../../controllers/assignment.controller");
const LectureFeedbackController = require("../../controllers/lecture.feedback.controller");
const AssignmentSubmissionController = require("../../controllers/assignment.submission.controller");
const ClassroomController = require("../../controllers/classroom.controller");
const CourseSectionController = require("../../controllers/course.section.controller");
const LectureAttendanceController = require("../../controllers/attendance.controller");
const LectureController = require("../../controllers/lectures.controller");
const CourseMaterialController = require("../../controllers/course.material.controller");

router.post("/teacher/new", TeachersController.addNewTeacher);

router.put(
  "/teacher/update/:id",
  TeachersController.updateTeacherPersonalDetailsById
);

router.get("/teacher/all", TeachersController.getAllTeachersAndPersonalDetails);

router.get("/teacher/:id", TeachersController.getTeacherPersonalDetailById);

router.delete("/teacher/delete/:id", TeachersController.deleteTeacherById);

router.post("/assignment/new", AssignmentController.createAssignment);

router.get("/assignment/all", AssignmentController.getAllAssignments);

router.get("/assignment/:id", AssignmentController.getAssignmentById);

router.put("/assignment/update/:id", AssignmentController.updateAssignment);

router.delete(
  "/assignment/delete/:id",
  AssignmentController.deleteAssignmentById
);

router.get(
  "/assignment/submission/:id",
  AssignmentSubmissionController.getAssignmentOfACourse
);
router.get(
  "/assignment/submitted/all",
  AssignmentSubmissionController.getAllSubmittedAssignmentsOfClass
);

// router.get(
//   "/assignment/submissions/all",
//   AssignmentSubmissionController.getAllSubmittedAssignment
// );

// router.get(
//   "/assignment/submitted/:id",
//   AssignmentSubmissionController.AssignmentSubmissionWithId
// );

router.post(
  "/lectureFeedback/:id",
  LectureFeedbackController.lectureFeedbackyTeachers
);

router.post(
  "/course/section/new/:courseId",
  CourseSectionController.addNewCourseSection
);

router.post(
  "/attendance/lecture/new",
  LectureAttendanceController.markStudentAsPresentUsingClassroomIdAndLectureId
);

router.post("/lecture/new", LectureController.addNewLecture);

router.post(
  "/course/material/new",
  CourseMaterialController.createCourseMaterial
);

//router.post("/course/activity", newCourseActivity);

router.get("/classroom/all", ClassroomController.getAllClassroom);

//router.get("/classroomId/:id", classroomWithGivenId);

router.post("/classroom/new", ClassroomController.createNewClassroom);

//router.put("/classroom/:id/course", addCourseInClassroom);

router.delete(
  "/classroom/id/:id",
  ClassroomController.deleteClassroomWithGivenId
);

router.post("/addNote", NoteController.createNewNotes);

router.delete("/deleteNote/:id", NoteController.deleteNote);

router.get("/note/all", NoteController.getAllNotes);

module.exports = router;
