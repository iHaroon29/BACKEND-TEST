const QuizSubmissionValidator=require("../validators/quiz.validators");
const QuizSubmissionDao=require("../dao/quiz.submitted.dao");
const CourseDao=require("../dao/course.dao");
const ServiceErrorMessage=require("../errors/serviceErrorMessage").getRejectResponse;
const ActivityLogger=require("../loggers/activity.logger");
const LOG_FOR_QUIZ_SUBMISSION=require("../config/LOGGERS_FOR").quiz_submission;

module.exports={
    async getAllSubmittedQuizOfCourse(courseId){
       try{
           return await QuizSubmissionDao.getAllQuizSubmissionByCourseId(courseId)
       }catch (e) {
           throw ServiceErrorMessage("unable to get all submission of quiz for this course",503,e)
       }
    },
    async submitQuiz(courseId,submittedQuiz,userDetails={}){
        try{
            const quiz={};
            const course=await CourseDao.getCourseByCourseId(courseId);
            quiz.quiz_questions_and_answers=course.quiz;
            quiz.course_id=courseId;
            quiz.user_role="STUDENT";
            quiz.quiz_response=submittedQuiz;
            quiz.user_id=submittedQuiz.user_id;
            const validQuizSubmission=await QuizSubmissionValidator.quizSubmission(quiz);
            const newQuizSubmission=await QuizSubmissionDao.createQuizSubmission(validQuizSubmission);
            await ActivityLogger.logActivityCreatedNew(newQuizSubmission,LOG_FOR_QUIZ_SUBMISSION,userDetails).catch();
            return newQuizSubmission;
        }catch (e) {
            throw ServiceErrorMessage("unable to submit quiz",503,e)
        }
    },
    async getQuizDetails(submittedQuizId){
        try{
            return await QuizSubmissionDao.getQuizSubmissionById(submittedQuizId)
        }catch (e) {
            throw ServiceErrorMessage("unable to get all submission of quiz for this course",503,e)
        }
    },
    async getAllQuizSubmission(){
        try{
            return await QuizSubmissionDao.getAllSubmittedQuiz()
        }catch (e) {
            throw ServiceErrorMessage("unable to get all submission of quiz for this course",503,e)
        }
    }
};