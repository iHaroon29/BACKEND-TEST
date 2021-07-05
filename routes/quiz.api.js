const QuizController=require("../controllers/quiz.controller");
const route=require("express").Router();
route.post("/course/:courseId/quiz/new",QuizController.addNewQuizToCourse);
route.post("/course/:courseId/quiz/submit",QuizController.submitQuiz);
route.delete("/course/:courseId/quiz/delete",QuizController.deleteQuiz);
module.exports=route;