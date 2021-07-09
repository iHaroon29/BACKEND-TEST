const CourseSection=require("../models/course.sections.model");
const Course=require("../models/courses.model");
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
    async getCourseSectionByCourseId(courseId){
       try{
           const courseSections=await JSON.parse(JSON.stringify(await CourseSection.find({"course_id":courseId})));
           for(let i in courseSections){
               courseSections[i]=await this.getCourseSectionByCourseSectionId(courseSections[i]._id);
           }
           return courseSections;
       }catch (e) {
           throw DAOError("unable to get course sections",500,e)
       }
    },

    async getAllCourseSections(){
       try{
           const courseSections=await JSON.parse(JSON.stringify(await CourseSection.find()));
           for(let i in courseSections){
               courseSections[i]=await this.getCourseSectionByCourseSectionId(courseSections[i]._id);
           }
           return courseSections;
       }catch (e) {
           throw DAOError("unable to get course sections",500,e)
       }
    },









    async getCourseSectionByCourseSectionId(courseSectionId){
        try{
            const courseSections= JSON.parse(JSON.stringify(await CourseSection.findById(courseSectionId)));
            if(!courseSections){
                return {};
            }
            courseSections.courseDetails=JSON.parse(JSON.stringify(await Course.findById(courseSections.course_id)));
            delete courseSections.courseDetails.quiz;
            return courseSections;
        }catch (e) {
            throw DAOError("unable to get course sections",500,e)
        }
    },
};