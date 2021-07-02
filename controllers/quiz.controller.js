const QuizService=require("../services/quiz.service");
module.exports={
    async addNewQuizToCourse(req,res){
        try{
            const AddedQuiz=await QuizService.addNewQuiz(req.params.courseId,req.body);
            return res.status(200).send(AddedQuiz);
        }catch (e) {
            return res.status(e.statusCode||500).send(e||"");
        }
    },
    async getQuestions(req,res){
        try {
            const quiz=await QuizService.getQuestions(req.params.courseId);
            return res.status(200).send(quiz);
        }catch (e) {
            return res.status(e.statusCode||500).send(e||"");
        }


    },
    updateQuizOfCourse(req,res){

    },
    submitQuiz(req,res){

    }
};