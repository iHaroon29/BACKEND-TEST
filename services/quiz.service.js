const QuizValidator=require("../validators/quiz.validators");
const CourseSectionDao=require("../dao/course.section.dao");
const QuizDao=require("../dao/quiz.dao");
const ServiceErrorMessage=require("../errors/serviceErrorMessage").getRejectResponse;
const ActivityLogger=require("../loggers/activity.logger");
const logForQuiz=require("../config/LOGGERS_FOR").quiz;

module.exports={
    async updateQuiz(courseSectionId,QuizDetails,userDetails={}){
        try{
            const validQuizData=await QuizValidator.newQuiz(QuizDetails);
            const oldData=await CourseSectionDao.getCourseSectionByCourseSectionId(courseSectionId);
            const savedQuiz=await QuizDao.updateQuiz(courseSectionId,validQuizData.quiz_details);
            await ActivityLogger.logActivityUpdated(oldData,savedQuiz,logForQuiz,userDetails);
            return savedQuiz;
        }catch (e) {
            throw ServiceErrorMessage("unable to create new quiz",503,e);
        }

    },
    async addNewQuiz(courseSectionId,QuizDetails,userDetails={}){
        try{
            const validQuizData=await QuizValidator.newQuiz(QuizDetails);
            const oldData=await CourseSectionDao.getCourseSectionByCourseSectionId(courseSectionId);
            const savedQuiz=await QuizDao.addNewQuiz(courseSectionId,validQuizData.quiz_details);
            await ActivityLogger.logActivityUpdated(oldData,savedQuiz,logForQuiz,userDetails);
            return savedQuiz;
        }catch (e) {
            throw ServiceErrorMessage("unable to create new quiz",503,e);
        }
    },
    async deleteQuizByCourseId(courseSectionId,userDetails={}){
        try{
            const savedQuiz=await QuizDao.deleteQuizByCourseId(courseSectionId);
            await ActivityLogger.logActivityDeleted(savedQuiz,logForQuiz,userDetails);
            return savedQuiz;
        }catch (e) {
            throw ServiceErrorMessage("unable to delete quiz",503,e);
        }
    },
};