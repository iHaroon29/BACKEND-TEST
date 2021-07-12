const QuizQuestionValidator=require("../validators/quiz.question.validators");
const ServiceErrorMessage=require("../errors/serviceErrorMessage").getRejectResponse;
const QuizQuestionDao=require("../dao/quiz.question.dao");
const ActivityLogger=require("../loggers/activity.logger");
const LOG_FOR_QUIZ_QUESTION=require("../config/LOGGERS_FOR").quiz_question;

module.exports={
    async getAllQuestions(courseId){
        try{
            const Quiz=JSON.parse(JSON.stringify(await QuizQuestionDao.getCourseQuiz(courseId)));
            for(let i in Quiz){
                delete Quiz[i].answer;
            }
            return Quiz;
        }catch (e) {
            throw ServiceErrorMessage("unable to get quiz questions",503,e)
        }
    },
    async addQuestionByCourseId(courseId,questionDetails,userDetails={}){
        try{
            const oldQuizQuestions=await QuizQuestionDao.getCourseQuiz(courseId);
            const validQuizQuestionDetails=await QuizQuestionValidator.newQuestion(questionDetails);
            const addedQuizQuestion= await QuizQuestionDao.addQuestionByCourseId(courseId,validQuizQuestionDetails);
            await ActivityLogger.logActivityUpdated(oldQuizQuestions,addedQuizQuestion,LOG_FOR_QUIZ_QUESTION,userDetails).catch();
            return addedQuizQuestion;
        }catch (e) {
            throw ServiceErrorMessage("unable to add quiz questions",503,e)
        }
    },
    async deleteQuestionByCourseIdAndQuestionNumber(courseId,questionNumber,userDetails={}){
        try{
            const oldQuizQuestions=await QuizQuestionDao.getCourseQuiz(courseId);
            const addedQuizQuestion= await QuizQuestionDao.deleteQuestionByCourseIdAndQuestionNumber(courseId,questionNumber);
            await ActivityLogger.logActivityUpdated(oldQuizQuestions,addedQuizQuestion,LOG_FOR_QUIZ_QUESTION,userDetails).catch();
            return addedQuizQuestion;
        }catch (e) {
            throw ServiceErrorMessage("unable to delete quiz questions",503,e)
        }
    },
    async updateQuizQuestionByCourseIdAndQuestionNumber(courseId,questionNumber,newQuestionDetails,userDetails={}){
        try{
            const oldQuizQuestions=await QuizQuestionDao.getCourseQuiz(courseId);
            const validQuizQuestionDetails=await QuizQuestionValidator.newQuestion(newQuestionDetails);
            const addedQuizQuestion= await QuizQuestionDao.updateQuizQuestionByCourseIdAndQuestionNumber(courseId,questionNumber,validQuizQuestionDetails);
            await ActivityLogger.logActivityUpdated(oldQuizQuestions,addedQuizQuestion,LOG_FOR_QUIZ_QUESTION,userDetails).catch();
            return addedQuizQuestion;
        }catch (e) {
            throw ServiceErrorMessage("unable to update quiz questions",503,e)
        }
    }
};