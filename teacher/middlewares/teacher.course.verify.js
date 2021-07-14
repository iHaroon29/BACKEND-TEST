const CourseService=require("../../services/course.services");
function checkIfTeacherHasAccessToCourse(teacherId,courseId){
    return new Promise((resolve,reject)=>{
        CourseService.getAllCourseByTeacherId(teacherId)
            .then((allCourses)=>{
                for(let course of allCourses){
                    if(course._id===courseId){
                        resolve(course);
                    }
                }
                reject();
            })
            .catch(err=>{
                reject(err)
            })
    })
}
module.exports=(req,res,next)=>{
    checkIfTeacherHasAccessToCourse(req.user.details._id)
        .then(()=>{
            next();
        }).catch(()=>{
            return res.sendStatus(401);
    })
};