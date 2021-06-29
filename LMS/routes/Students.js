const router = require("express").Router();
const CourseSectionController = require("../../controllers/course.section.controller");
const StudentsController = require("../../controllers/students.controller");
const AssignmentController = require("../../controllers/assignment.controller");
const AssignmentSubmissionController = require("../../controllers/assignment.submission.controller");
const LectureFeedbackController = require("../../controllers/lecture.feedback.controller");
const CourseController = require("../../controllers/course.controllers");

router.get("/course/section/all", CourseSectionController.getAllCourseSections);

router.get("/student/all", StudentsController.getAllStudents);

router.post(
  "/assignment/submit",
  AssignmentSubmissionController.assignmentSubmit
);

router.get(
  "/classroom/:id/assignment/all",
  AssignmentController.getAllAssignmentOfAClassroom
);

router.get(
  "/student/:id/assignment/submitted/all",
  AssignmentSubmissionController.getAllSubmittedAssignmentsOfClass
);

router.post("/student/new", StudentsController.addNewStudent);

router.delete("/student/delete/:id", StudentsController.deleteStudentById);

router.post(
  "/feedback/lecture/:id",
  LectureFeedbackController.lectureFeedbackByStudent
);

router.get("/course/all", CourseController.getAllCourse);

//router.get("/course/:id", getCourseWithId);

router.post("/course/new", CourseController.addNewCourse);

//router.put("/course/update/:id", updateCourse);

//router.delete("/course/delete/:id", deleteCourse);

router.use(require("../../routes/student.courses.api"));
module.exports = router;
