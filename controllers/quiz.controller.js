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
    submitQuiz(req,res){

    },
    async deleteQuiz(req,res){
        try {
            const deletedQuiz=await QuizService.deleteQuizByCourseId(req.params.courseId);
            return res.status(202).send(deletedQuiz);
        }catch (e) {
            return res.status(e.statusCode||503).send(e);
        }
    },

};