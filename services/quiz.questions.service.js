const QuizValidator=require("../validators/quiz.question.validators");
const Course=require("../models/courses.model");
const RejectErrorResponse=require("../errors/serviceErrorMessage").getRejectResponse;

module.exports={
    getAllQuestions(courseId){
        return new Promise((resolve,reject)=>{
            Course.findById(courseId)
                .then(course=>{
                    course=JSON.parse(JSON.stringify(course));
                    course.quiz.filter((el)=>{
                        delete el.answer;
                        return el;
                    });
                    resolve(course.quiz);
                }).catch(err=>{
                    reject(RejectErrorResponse("unable to find quizzes",503,err))
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