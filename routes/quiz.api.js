const QuizController=require("../controllers/quiz.controller");
const route=require("express").Router();

// route.use("course/:courseId/quiz",()=>{
route.post("/course/:courseId/quiz/new",QuizController.addNewQuizToCourse);
route.get("/course/:courseId/quiz/get/questions",QuizController.getQuestions);
route.post("/course/:courseId/quiz/submit",QuizController.submitQuiz);
// });

module.exports=route;