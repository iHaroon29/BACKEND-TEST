const Assignment = require("../models/assignments.model")
const AssignmentSubmission = require("../models/assignment.submissions.model")
const DAOError = require("../errors/dao.errors").getDAOErrorMessage;
const Classroom = require("./classroom.dao")

module.exports = {
    assignmentSubmit(assignmentDetails){
        return new Promise((resolve, reject) => {
            new AssignmentSubmission(assignmentDetails)
              .save()
              .then((savedDetails) => {
                resolve(savedDetails);
              })
              .catch((error) => {
                reject(DAOError("unable to create assignment", 503, error));
              });
          });
    },

    getAllSubmittedAssignment(){
        return new Promise((resolve, reject) => {
            AssignmentSubmission.find()
              .then((allAssignments) => {
                resolve(allAssignments);
              })
              .catch((error) => {
                reject(DAOError("unable to get all assignments", 503, error));
              });
          });
    },

    setGradesOfAssignmentById(assignmentSubmissionId, grade){
        return new Promise((resolve,reject) =>{
            AssignmentSubmission.findByIdAndUpdate(assignmentSubmissionId, {grade:grade}, {new:true} ).then((allAssignment)=>{
                resolve(allAssignment)
            }).catch((error)=>{
                reject(DAOError("unable to set grade for assignment", 503, error));
            })
        })
    },
    
    getAssignmentByID(assignmentSubmissionId){
        return new Promise((resolve, reject)=>{
            AssignmentSubmission.findById(assignmentSubmissionId).then((assignmentId)=>{
                resolve(assignmentId)
            }).catch((error)=>{
                reject(DAOError("unable to get all submitted assignment grade", 503, error));
            })
        })
    }
}