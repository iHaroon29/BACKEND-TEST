const CourseSection=require("../models/course.sections.model");
const DAOError=require("../errors/dao.errors").getDAOErrorMessage;
module.exports={
    createCourseSection(courseSectionDetails){
        return new Promise((resolve,reject)=>{
            new CourseSection(courseSectionDetails).save()
                .then(savedDetails=>{
                    resolve(savedDetails);
                }).catch(err=>{
                    reject(DAOError("unable to add new course section",503,err));
            })
        })
    },
    updateCourseSectionById(courseId,newCourseSectionDetails){
        return new Promise((resolve,reject)=>{
            CourseSection.findByIdAndUpdate(courseId,newCourseSectionDetails,{new:true})
                .then(updatedCourseSection=>{
                    resolve(updatedCourseSection);
                }).catch(err=>{
                    reject(DAOError("unable to update course section",503,err));
            })
        })
    },
    deleteCourseSectionById(courseId){
        return new Promise((resolve,reject)=>{
            CourseSection.findByIdAndDelete(courseId)
                .then(deletedCourseSection=>{
                    resolve(deletedCourseSection);
                }).catch(err=>{
                    reject(DAOError("unable to delete course section",503,err));
            })
        })
    },
    getCourseSectionByCourseId(courseId){
        return new Promise((resolve,reject)=>{
            CourseSection.find({course_id:courseId})
                .then(allCourseSections=>{
                    resolve(allCourseSections);
                }).catch(err=>{
                    reject(DAOError("unable to find course section",503,err));
            })
        })
    },
    getCourseSectionByCourseSectionId(courseSectionId){
        return new Promise((resolve,reject)=>{
            CourseSection.findById(courseSectionId)
                .then(courseSection=>{
                    resolve(courseSection);
                }).catch(err=>{
                    reject(DAOError("unable to find course section",503,err));
            })
        })
    },
};