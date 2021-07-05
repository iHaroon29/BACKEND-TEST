const QuizValidator=require("../validators/quiz.validators");
const Course=require("../models/courses.model");
const RejectErrorResponse=require("../errors/serviceErrorMessage").getRejectResponse;

module.exports={
    updateQuiz(courseId,QuizDetails){
        return Course.findByIdAndUpdate(courseId,{quiz:QuizDetails},{new:true})
            .then(updatedCourseDetails=> updatedCourseDetails.quiz)

    },
    addNewQuiz(courseId,QuizDetails){
        return new Promise((resolve,reject)=>{
            Course.findById(courseId)
                .then(course=>{
                    if(course && course.quiz && course.quiz.length>0){
                        reject(RejectErrorResponse("quiz already present",400))
                    }
                    QuizValidator.newQuiz(QuizDetails)
                        .then(validQuizData=>{
                            return Course.findByIdAndUpdate(courseId,{quiz:validQuizData.quiz_details},{new:true})
                                .then(updatedCourseDetails=> resolve(updatedCourseDetails.quiz))
                                .catch(err=>{
                                    reject(RejectErrorResponse("unable to add quiz ",503,err))
                                })
                        }).catch(err=>{
                        reject(RejectErrorResponse("Invalid data",503,err))
                    })
                }).catch(err=>{
                    reject(RejectErrorResponse("unable to find course",503,err))
            })
        })

    },
    deleteQuizByCourseId(courseId){
        return new Promise((resolve,reject)=>{
            Course.findByIdAndUpdate(courseId,{quiz:[]})
                .then(deletedQuizDetails=>{
                    if(!deletedQuizDetails.quiz){
                        reject(RejectErrorResponse("no course found",400));
                    }
                    if(deletedQuizDetails.quiz.length<1){
                        reject(RejectErrorResponse("no quiz found",400));
                    }
                    resolve(deletedQuizDetails.quiz)
                }).catch(err=> {
                reject(RejectErrorResponse("unable to remove quiz", 503, err));
            })
        })
    },
};