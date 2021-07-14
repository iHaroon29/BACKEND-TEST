const QuizSubmissionService=require("../services/quiz.submission.service");
module.exports={
    async submitQuiz(req,res){
        try {
            const submittedQuizData= await QuizSubmissionService.createNewQuizSubmission(req.params.courseSectionId,req.body);
            return res.status(202).send(submittedQuizData);
        }catch (e) {
            return res.status(e.statusCode||503).send(e);
        }
    },
    async getQuizSubmissionOfCourseSection(req,res){
        try {
            const submittedQuizData= await QuizSubmissionService.getAllQuizSubmissionOfCourseSection(req.params.courseSectionId);
            return res.status(202).send(submittedQuizData);
        }catch (e) {
            return res.status(e.statusCode||503).send(e);
        }
    },
    async getQuizSubmissionOfCourse(req,res){
        try {
            const submittedQuizData= await QuizSubmissionService.getAllSubmittedQuizOfCourse(req.params.courseId);
            return res.status(202).send(submittedQuizData);
        }catch (e) {
            return res.status(e.statusCode||503).send(e);
        }
    },
};