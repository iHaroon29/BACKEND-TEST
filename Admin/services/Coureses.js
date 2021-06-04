const Course=require("../../models/mongodb/courses");
const courseValidator=require("../../utils/Course.validators");
const CourseActivityLogger=require("../../middlewares/courses.activity.logger");

module.exports={
    addNewCourse(courseDetails){
        return courseValidator.newCourse(courseDetails).then(validData=>{
            return new Course(validData).save()
                .then(savedCourse=>{
                    // TODO: write in activity log tracker
                    CourseActivityLogger.newCourseAdded({});
                    return savedCourse;
                })
        })
    },
    updateCourseById(courseDetails){
        return courseValidator.updateCourse(courseDetails)
            .then((validData)=>{
                const id=validData._id;
                delete validData._id;
               return Course.findByIdAndUpdate(id,validData,{new:true})
                    .then(updatedCourse=>{
                        return updatedCourse;
                    })
            })
    },
    deleteCourseById(courseId){
        return Course.findByIdAndDelete(courseId)
            .then(deletedCourse=>{
                return deletedCourse;
            })
    },
    getAllCourses(){
        return Course.find().then(courses=>{
            return courses;
        })
    }
};