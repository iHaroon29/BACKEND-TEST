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
    getQuestions(courseId){
        return Course.findById(courseId)
            .then(course=>course.quiz);
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
    addQuestionByCourseId(courseId,questionDetails){
        return new Promise((resolve,reject)=> {
            QuizValidator.newQuestion(questionDetails).then(validQuestionDetails => {
                Course.findByIdAndUpdate(courseId,{
                        $push:{quiz:validQuestionDetails}
                    },{new:true})
                    .then(updatedQuiz=>{
                        resolve(updatedQuiz.quiz)
                    }).catch(err=> {
                    reject(RejectErrorResponse("unable to add question to quiz", 503, err));
                })
            }).catch(err=>{
                reject(RejectErrorResponse("invalid question details",400,err))
            })
        })
    },
    deleteQuestionByCourseIdAndQuestionNumber(courseId,questionNumber){
        return new Promise((resolve,reject)=>{
           QuizValidator.deleteQuestion({courseId,questionNumber})
               .then(validDeleteDetails=>{
                   Course.findById(validDeleteDetails.courseId).then(courseDetails=>{
                       if(courseDetails.quiz.length<1){
                           reject(RejectErrorResponse("no quiz present"))
                       }
                       const deleteQuizQuestion=courseDetails.quiz.splice(questionNumber-1,1);
                       courseDetails.save().then(updatedQuizDetails=>{
                           resolve({new_quiz_questions:updatedQuizDetails.quiz,deleted_questions:deleteQuizQuestion})

                       }).catch(unableToUpdateQuiz=>{
                           reject(RejectErrorResponse("unable to update quiz"),503,unableToUpdateQuiz)
                       })
                   }).catch(err=>{
                       reject("unable to find course",503,err)
                   })
               }).catch(validationError=>{
               reject(RejectErrorResponse("invalid data",400,validationError))
           })
        })
    },
    updateQuizQuestionByCourseIdAndQuestionNumber(courseId,questionNumber,newQuestionDetails){
        return new Promise((resolve,reject)=>{
            QuizValidator.updateQuestion({courseId,questionNumber,newQuestionDetails})
                .then(validDeleteDetails=>{
                    Course.findById(validDeleteDetails.courseId).then(courseDetails=>{
                        if(courseDetails.quiz.length<1){
                            reject(RejectErrorResponse("no quiz present"))
                        }
                        if(courseDetails.quiz.length<questionNumber){
                            reject(RejectErrorResponse("invalid question number"))
                        }
                        courseDetails.quiz.splice(questionNumber-1,1,newQuestionDetails);
                        courseDetails.save().then(updatedQuizDetails=>{
                            resolve(updatedQuizDetails.quiz)

                        }).catch(unableToUpdateQuiz=>{
                            reject(RejectErrorResponse("unable to update quiz"),503,unableToUpdateQuiz)
                        })
                    }).catch(err=>{
                        reject("unable to find course",503,err)
                    })
                }).catch(validationError=>{
                reject(RejectErrorResponse("invalid data",400,validationError))
            })
        })
    }
};