const DAOError=require("../errors/dao.errors").getDAOErrorMessage;
const Course = require("../models/courses.model")
const QuizSubmission = require("../models/quiz.submitted.model")

module.exports = {

  createQuizSubmission(){
    return new Promise((resolve, reject) => {
      new QuizSubmission(quizsDetails)
        .save()
        .then((savedDetails) => {
          resolve(savedDetails);
        })
        .catch((error) => {
          reject(DAOError("unable to create quiz", 503, error));
        });
    });
  },

    getAllSubmittedQuiz(){
        return new Promise((resolve, reject) => {
            QuizSubmission.find()
              .then((allquizSubmission) => {
                resolve(allquizSubmission);
              })
              .catch((error) => {
                reject(DAOError("unable to get all quiz submission", 503, error));
              });
          });
    },

    getQuizSubmissionById(quizId){
      return new Promise((resolve, reject)=>{
        QuizSubmission.findById(quizId).then((quizDetails)=>{
            if(!quizDetails){
                reject("unable to find", 400)
            }
            resolve(quizDetails)
        }).catch((error)=>{
            reject(DaoError("unable to find quiz",503,error))
        })
    })
    },


    updateQuizSubmissionById(quizId, newQuiz){
      return new Promise((resolve, reject)=>{
        QuizSubmission.findByIdAndUpdate(quizId, newQuiz, {new:true}).then((quizDetails)=>{
            if(!quizDetails){
                reject("unable to update", 400)
            }
            resolve(quizDetails)
        }).catch((error)=>{
            reject(DaoError("unable to update quiz",503,error))
        })
    })
    },

    deleteQuizSubmissionById(quizId){
      return new Promise((resolve, reject)=>{
        QuizSubmission.findByIdAndDelete(quizId).then((deletedQuiz)=>{
          if(!deletedQuiz){
            reject("quiz can not be deleted", 400)
          }
          resolve(deletedQuiz)
        }).catch((error)=>{
          reject(DAOError("unable to delete quiz", 503, error));
        })
      })
        
    },

    
}