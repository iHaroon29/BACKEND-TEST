const QuizController=require("../controllers/quiz.controller");
const route=require("express").Router();

route.post("/course/:courseId/quiz/new",QuizController.addNewQuizToCourse);
route.get("/course/:courseId/quiz/get/questions",QuizController.getQuestions);
route.post("/course/:courseId/quiz/submit",QuizController.submitQuiz);
route.delete("/course/:courseId/quiz/delete",QuizController.deleteQuiz);
route.post("/course/:courseId/quiz/add/question",QuizController.addQuestion);
route.delete("/course/:courseId/quiz/delete/question/:questionNumber",QuizController.deleteQuestion);
route.put("/course/:courseId/quiz/update/question/:questionNumber",QuizController.updateQuizQuestion);

module.exports=route;