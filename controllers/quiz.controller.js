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

    },
    async deleteQuiz(req,res){
        try {
            const deletedQuiz=await QuizService.deleteQuizByCourseId(req.params.courseId);
            return res.status(202).send(deletedQuiz);
        }catch (e) {
            return res.status(e.statusCode||503).send(e);
        }
    },
    async deleteQuestion(req,res){
        try {
            const deletedQuiz=await QuizService.deleteQuestionByCourseIdAndQuestionNumber(req.params.courseId,req.params.questionNumber);
            return res.status(202).send(deletedQuiz);
        }catch (e) {
            console.log(e)
            return res.status(e.statusCode||503).send(e);
        }
    },
    async addQuestion(req,res){
        try {
            const deletedQuiz=await QuizService.addQuestionByCourseId(req.params.courseId);
            return res.status(202).send(deletedQuiz);
        }catch (e) {
            return res.status(e.statusCode||503).send(e);
        }
    },
    async updateQuizQuestion(req,res){
        try {
            const deletedQuiz=await QuizService.updateQuizQuestionByCourseIdAndQuestionNumber(req.params.courseId,req.params.questionNumber,req.body);
            return res.status(202).send(deletedQuiz);
        }catch (e) {
            return res.status(e.statusCode||503).send(e);
        }
    },

};