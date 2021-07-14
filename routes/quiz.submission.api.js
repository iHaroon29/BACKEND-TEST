const QuizSubmissionController=require("../controllers/quiz.submission.controller");
const route=require("express").Router();
route.post("/course/section/:courseSectionId/quiz/submit",QuizSubmissionController.submitQuiz);
route.get("/course/section/:courseSectionId/quiz/submissions/all",QuizSubmissionController.getQuizSubmissionOfCourseSection);
route.get("/course/:courseId/quiz/submissions/all",QuizSubmissionController.getQuizSubmissionOfCourse);
module.exports=route;