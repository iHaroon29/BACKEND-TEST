const QuizSubmission=require("../models/quiz.submitted.model");
const Course=require("../models/courses.model");
const QuizSubmissionValidator=require("../validators/quiz.validators");
module.exports={
    getAllSubmittedQuizOfQuiz(courseId){
        const filters={};
        filters["course_id."+courseId]={ $exists:true};
        return QuizSubmission.find(filters)
            .then(submittedQuiz=>submittedQuiz);
    },
    submitQuiz(courseId,submittedQuiz){
        const quiz={};
        return new Promise((resolve,reject)=>{
            Course.findById(courseId).then(course=>{
                quiz.quiz_questions_and_answers=course.quiz;
                quiz.course_id=courseId;
                quiz.user_role="STUDENT";
                quiz.quiz_response=submittedQuiz;
                quiz.user_id=submittedQuiz.user_id;
                return QuizSubmissionValidator.quizSubmission(quiz)
                    .then(validQuizSubmissionData=>{
                        return new QuizSubmission(validQuizSubmissionData)
                            .then(submittedQuiz=>{
                                if(!submittedQuiz) {
                                    reject({
                                        statusCode: 304,
                                        trace: err,
                                        message: "No data found"
                                    })
                                }
                                resolve(submittedQuiz)
                            })
                            .catch(err=>{
                                reject({
                                    statusCode:503,
                                    trace:err,
                                    message:"Unable to find data"
                                })
                            })
                    }).catch(err=>{
                        reject({
                            statusCode:400,
                            trace:err,
                            message:"Invalid requested data"
                        })
                    })
            })
        })

    },
    getQuizDetails(submittedQuizId){
        return QuizSubmission.findById(submittedQuizId);
    }
};