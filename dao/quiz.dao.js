const DAOError=require("../errors/dao.errors").getDAOErrorMessage;
const Course = require("../models/courses.model")
const Quiz = require("../models")

module.exports = {
    addNewQuiz(){
        return new Promise((resolve, reject) => {
            new QuizSubmission(quizDetails)
              .save()
              .then((savedDetails) => {
                resolve(savedDetails);
              })
              .catch((error) => {
                reject(DAOError("unable to create assignment", 503, error));
              });
          });
    },

    updateQuiz(){

    },

    deleteQuiz(){

    }
}