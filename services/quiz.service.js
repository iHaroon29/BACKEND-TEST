const QuizValidator=require("../utils/quiz.validators");
const Course=require("../models/courses.model");

module.exports={
    updateQuiz(courseId,QuizDetails){
        return Course.findByIdAndUpdate(courseId,{quiz:QuizDetails},{new:true})
            .then(updatedCourseDetails=> updatedCourseDetails.quiz)

    },
    addNewQuiz(courseId,QuizDetails){
        return new Promise((resolve,reject)=>{
            QuizValidator.newQuiz(QuizDetails)
                .then(validQuizData=>{
                    return Course.findByIdAndUpdate(courseId,{quiz:validQuizData},{new:true})
                        .then(updatedCourseDetails=> resolve(updatedCourseDetails.quiz))
                        .catch(err=>{
                            reject({
                                message:"Unable to update course",
                                statusCode:503,
                                trace:err
                            })
                        })
                }).catch(err=>{
                reject({
                    message:"Invalid data",
                    statusCode:503,
                    trace:err
                })
            })
        })

    },
    getQuestions(courseId){
        return Course.findById(courseId)
            .then(course=>course.quiz);
    },
};