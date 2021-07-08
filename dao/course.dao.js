const Course=require("../models/courses.model");
const DAOError=require("../errors/dao.errors").getDAOErrorMessage;
const CourseSectionDao=require("./course.section.dao");
module.exports={
    createNewCourse(courseDetails){
        return new Promise((resolve,reject)=>{
            new Course(courseDetails).save()
                .then((savedCourse)=>{
                    resolve(savedCourse)
                }).catch(err=>{
                    reject(DAOError("unable to add course",503,err));
            })
        })
    },
    updateCourseByCourseId(courseId,newCourseDetails){
        return new Promise((resolve,reject)=>{
            Course.findByIdAndUpdate(courseId,newCourseDetails,{new:true})
                .then((updatedCourse)=>{
                    resolve(updatedCourse)
                }).catch(err=>{
                reject(DAOError("unable to update course",503,err));
            })
        })
    },
    deleteCourseByCourseId(courseId){
        return new Promise((resolve,reject)=>{
            Course.findByIdAndDelete(courseId)
                .then((deletedCourse)=>{
                    if(!deletedCourse){
                        reject(DAOError("no course found",400))
                    }
                    resolve(deletedCourse)
                }).catch(err=>{
                reject(DAOError("unable to delete course",503,err));
            })
        })
    },
    getCourseByCourseId(courseId){
        return new Promise((resolve,reject)=>{
            Course.findById(courseId)
                .then((courseDetails)=>{
                    if(!courseDetails){
                        reject(DAOError("no courses found",400));
                    }
                    courseDetails=JSON.parse(JSON.stringify(courseDetails));
                    courseDetails.course_sections=[];
                    delete courseDetails.quiz;
                    CourseSectionDao.getCourseSectionByCourseId(courseId).then((courseSections)=>{
                        if(!courseSections){
                            reject(DAOError("no course section found",400))
                        }
                        courseDetails.course_sections=courseSections;
                        // console.log(courseDetails)
                        resolve(courseDetails)

                    })
                }).catch(err=>{
                reject(DAOError("unable to delete course",503,err));
            })
        })
    },
    async getAllCourses(){
        try{
            let courses=await Course.find();
            for(let x in courses){
                courses[x]=await this.getCourseByCourseId(courses[x]._id).catch()
            }
            return courses;
        }catch (e) {
            console.log(e)
        }

    },
    getCourseByTeacherId(teacherId){
        return new Promise((resolve,reject)=>{
            const filter={};
            filter["teachers."+teacherId]={
                $exists:true
            };
            Course.find(filter)
                .then((allCourses)=>{
                    allCourses=JSON.parse(JSON.stringify(allCourses));
                    allCourses.filter(async (courseDetails,index)=>{
                        courseDetails=await this.getCourseByCourseId(courseDetails._id).catch()
                            .catch();
                        return courseDetails;
                    });
                    resolve(allCourses)
                }).catch(err=>{
                reject(DAOError("unable to find course",503,err));
            })
        })
    }
};