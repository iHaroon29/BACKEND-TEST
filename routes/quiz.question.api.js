const QuizController=require("../controllers/quiz.questions.controller");
const route=require("express").Router();

route.post("/course/:courseId/quiz/add/question",QuizController.addQuestion);
route.delete("/course/:courseId/quiz/delete/question/:questionNumber",QuizController.deleteQuestion);
route.put("/course/:courseId/quiz/update/question/:questionNumber",QuizController.updateQuizQuestion);
route.get("/course/:courseId/quiz/get/questions/all/",QuizController.getQuestionsWithoutAnswers);
module.exports=route;