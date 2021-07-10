const Course=require("../models/course.sections.model");
const DaoError=require("../errors/dao.errors").getDAOErrorMessage;

module.exports={
    getCourseQuiz(courseId){
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
                reject(DaoError("unable to find quizzes",503,err))
            })
        })
    },
    addQuestionByCourseId(courseId,questionDetails){
        return new Promise((resolve,reject)=> {
            Course.findByIdAndUpdate(courseId,{
                $push:{quiz:questionDetails}
            },{new:true})
                .then(updatedQuiz=>{
                    resolve(updatedQuiz.quiz)
                }).catch(err=> {
                reject(DaoError("unable to add question to quiz", 503, err));
            })

        })
    },

    deleteQuestionByCourseIdAndQuestionNumber(courseId,questionNumber){
        return new Promise((resolve,reject)=>{
            Course.findById(courseId).then(courseDetails=>{
                if(courseDetails.quiz.length<1){
                    reject(DaoError("no quiz present"))
                }
                const deleteQuizQuestion=courseDetails.quiz.splice(questionNumber-1,1);
                courseDetails.save().then(updatedQuizDetails=>{
                    resolve({new_quiz_questions:updatedQuizDetails.quiz,deleted_questions:deleteQuizQuestion})
                }).catch(unableToUpdateQuiz=>{
                    reject(DaoError("unable to update quiz"),503,unableToUpdateQuiz)
                })
            }).catch(err=>{
                reject("unable to find course",503,err)
            })
        })
    },

    updateQuizQuestionByCourseIdAndQuestionNumber(courseId,questionNumber,newQuestionDetails){
        return new Promise((resolve,reject)=>{
            Course.findById(courseId).then(courseDetails=>{
                if(courseDetails.quiz.length<1){
                    reject(DaoError("no quiz present"))
                }
                if(courseDetails.quiz.length<questionNumber){
                    reject(DaoError("invalid question number"))
                }
                courseDetails.quiz.splice(questionNumber-1,1,newQuestionDetails);
                courseDetails.save().then(updatedQuizDetails=>{
                    resolve(updatedQuizDetails.quiz)
                }).catch(unableToUpdateQuiz=>{
                    reject(DaoError("unable to update quiz"),503,unableToUpdateQuiz)
                })
            }).catch(err=>{
                reject("unable to find course",503,err)
            })
        })
    }
};