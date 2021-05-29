const Course=require("../../models/mongodb/courses");

module.exports={
  addNewCourse(courseDetails){
      return new Course(courseDetails).save()
          .then(savedCourse=>{
              return savedCourse;
          })
  },
    updateCourseById(courseId,courseDetails){
      return Course.findByIdAndUpdate(courseId,courseDetails,{new:true})
          .then(updatedCourse=>{
              return updatedCourse;
          })
    },
    deleteCourseById(courseId){
      return Course.findByIdAndDelete(courseId)
          .then(deletedCourse=>{
              return deletedCourse;
          })
    },
};