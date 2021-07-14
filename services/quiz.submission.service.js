const QuizSubmissionValidator=require("../validators/quiz.validators");
const QuizSubmissionDao=require("../dao/quiz.submitted.dao");
const CourseSection=require("../models/course.sections.model");
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
    async createNewQuizSubmission(courseSectionId,submittedQuiz,userDetails={}){
        try{
            const quiz={};
            const course=await CourseSection.findById(courseSectionId);
            quiz.quiz_questions_and_answers=course.quiz;
            if(!quiz.quiz_questions_and_answers){
                throw ServiceErrorMessage("no quiz present",400);
            }
            quiz.course_section_id=courseSectionId;
            quiz.user_role="STUDENT";
            quiz.quiz_response=submittedQuiz.quiz_response;
            quiz.user_id=submittedQuiz.user_id;
            const validQuizSubmission=await QuizSubmissionValidator.quizSubmission(quiz);
            const newQuizSubmission=await QuizSubmissionDao.createQuizSubmission(validQuizSubmission);
            await ActivityLogger.logActivityCreatedNew(newQuizSubmission,LOG_FOR_QUIZ_SUBMISSION,userDetails).catch();
            return newQuizSubmission;
        }catch (e) {
            throw ServiceErrorMessage(e.message||"unable to submit quiz",e.statusCode||503,e)
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
            throw ServiceErrorMessage(e.message||"unable to get all submission of quiz for this course",e.statusCode||503,e)
        }
    },
    async getAllQuizSubmissionOfCourseSection(courseSectionId){
        try{
            return await QuizSubmissionDao.getAllQuizSubmissionByCourseSectionId(courseSectionId)
        }catch (e) {
            throw ServiceErrorMessage(e.message||"unable to get all submission of quiz for this course",e.statusCode||503,e)
        }
    }
};