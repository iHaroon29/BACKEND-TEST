const QuizService=require("../services/quiz.service");
module.exports={
    async addNewQuizToCourse(req,res){
        try{
            const AddedQuiz=await QuizService.addNewQuiz(req.params.courseId,req.body);
            return res.status(200).send(AddedQuiz);
        }catch (e) {
            return res.status(e.statusCode||500).send(e.message||"");
        }
    },
    getQuestions(req,res){

    },
    updateQuizOfCourse(req,res){

    },
    submitQuiz(req,res){

    }
};