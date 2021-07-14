const DAOError=require("../errors/dao.errors").getDAOErrorMessage;
const QuizSubmission = require("../models/quiz.submitted.model");
const Course = require("../models/courses.model");
const CourseSection = require("../models/course.sections.model");

module.exports = {
    createQuizSubmission(quizSubmissionDetails){
        return new Promise((resolve, reject) => {
            new QuizSubmission(quizSubmissionDetails)
                .save()
                .then((savedDetails) => {
                    resolve(savedDetails);
                })
                .catch((error) => {
                    reject(DAOError("unable to submit quiz", 503, error));
                });
        });
    },
    getAllSubmittedQuiz(){
        return new Promise((resolve, reject) => {
            QuizSubmission.find()
                .then((allQuizSubmissions) => {
                    resolve(allQuizSubmissions);
                })
                .catch((error) => {
                    reject(DAOError("unable to get all quiz submission", 503, error));
                });
        });
    },
    getQuizSubmissionById(quizSubmissionId){
        return new Promise((resolve, reject)=>{
            QuizSubmission.findById(quizSubmissionId).then((quizDetails)=>{
                if(!quizDetails){
                    reject("unable to find quiz submission", 400)
                }
                resolve(quizDetails)
            }).catch((error)=>{
                reject(DAOError("unable to find quiz",503,error))
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
                reject(DAOError("unable to update quiz",503,error))
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
    async getAllQuizSubmissionByCourseId(courseId){
        try{
            const course=await Course.findById(courseId);
            if(!course){
                throw DAOError("no course found",400)
            }
            const allCourseSections=await CourseSection.find({"course_id":courseId});
            if(!allCourseSections){
                throw DAOError("no course sections found",400)
            }
            const allQuizSubmissions=[];
            for( let i of allCourseSections){
                allQuizSubmissions.push(...(JSON.parse(JSON.stringify(await QuizSubmission.find({"course_section_id":i._id})))));
            }
            return allQuizSubmissions;
        }catch (e) {

            throw DAOError(e.message||"no course found",e.statusCode||503,e)
        }
        return new Promise((resolve, reject)=>{
            QuizSubmission.find({course_id:courseId}).then((allSubmittedQuizOfCourses)=>{
                resolve(allSubmittedQuizOfCourses)
            }).catch((error)=>{
                reject(DAOError("unable to get all quiz submissions of course", 503, error));
            })
        })

    },
    getAllQuizSubmissionByCourseSectionId(courseSectionId){
        return new Promise((resolve, reject)=>{
            QuizSubmission.find({course_section_id:courseSectionId}).then((allSubmittedQuizOfCourses)=>{
                resolve(allSubmittedQuizOfCourses)
            }).catch((error)=>{
                reject(DAOError("unable to get all quiz submissions of course section", 503, error));
            })
        })

    },
};