const DAOError=require("../errors/dao.errors").getDAOErrorMessage;
const CourseSection = require("../models/course.sections.model");

module.exports = {
    updateQuiz(courseId,QuizDetails){
        return CourseSection.findByIdAndUpdate(courseId,{quiz:QuizDetails},{new:true})
            .then(updatedCourseDetails=> updatedCourseDetails.quiz)
    },

    async addNewQuiz(courseId,QuizDetails){
        try{
            const course=await CourseSection.findById(courseId);
            if(course && course.quiz && course.quiz.length>0){
                throw DAOError("quiz already present",400);
            }
            return await CourseSection.findByIdAndUpdate(courseId, {quiz: QuizDetails}, {new: true});
        }catch (e) {
            throw DAOError(e.message||"quiz already present",e.statusCode||503,e);
        }
    },

    deleteQuizByCourseId(courseId){
        return new Promise((resolve,reject)=>{
            CourseSection.findByIdAndUpdate(courseId,{quiz:[]})
                .then(deletedQuizDetails=>{
                    if(!deletedQuizDetails.quiz){
                        reject(DAOError("no course found",400));
                    }
                    if(deletedQuizDetails.quiz.length<1){
                        reject(DAOError("no quiz found",400));
                    }
                    resolve(deletedQuizDetails.quiz)
                }).catch(err=> {
                reject(DAOError("unable to remove quiz", 503, err));
            })
        })
    },
};