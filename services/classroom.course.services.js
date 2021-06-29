const ClassroomService=require("./classrooms.services");
const Classroom=require("../models/classrooms.model");
const Course=require("../models/courses.model");
module.exports={
    getAllClassroomByCourseId(courseId){
        return new Promise((reject,resolve)=>{
            const filter={};
            filter["enrolled_courses."+courseId]={$exists:true};
            ClassroomService.find(filter)
                .then(allClassrooms=>{
                    resolve(allClassrooms);
                }).catch(err=>{
                   reject({
                        message:"Unable to find Classrooms",
                        statusCode:503,
                        trace:err
                    })
            })
        })
    },
    addCourseInClassroom(classroomId, courseId,teacherId) {
        return new Promise((resolve,reject)=>{
            Classroom.findById(classroomId).then((classroom) => {
                classroom=JSON.parse(JSON.stringify(classroom));
                if (classroom.enrolled_courses[courseId]) {
                    throw new Error("Already enrolled in course");
                }
                Course.findById(courseId)
                    .then(course=>{
                        if(!course.teachers[teacherId]){
                            reject({
                                message:"teacher is not registered for the specified course",
                                statusCode:304,
                                trace:"no trace found"
                            })
                        }
                        classroom.enrolled_courses[courseId] = {
                            createdAt: new Date()
                        };
                        classroom.enrolled_courses[courseId].teachers=teacherId;
                        Classroom.findByIdAndUpdate(
                            classroomId,
                            {enrolled_courses: classroom.enrolled_courses},
                            {new: true}
                        )
                            .then(newClassroomDetails=>resolve(newClassroomDetails))
                            .catch(err=>{
                                reject({
                                    message:"Unable to update classroom",
                                    statusCode:503,
                                    trace:err
                                }
                            )})
                    }).catch(err=>{
                    reject({
                            message:"Unable to find course",
                            statusCode:503,
                            trace:err
                        }
                    )})
            }).catch(err=>{
                reject({
                        message:"Unable to find classroom",
                        statusCode:503,
                        trace:err
                    }
                )})
        });
    },
    removeCourseFromClassroom(classroomId,courseId){
        return new Promise((resolve,reject)=>{
            Classroom.findById(classroomId).then(classroom=>{
                if(!classroom){
                    reject({
                        message:"no classroom found ",
                        statusCode:304,
                        trace:"no trace found"
                    })
                }
                classroom=JSON.parse(JSON.stringify(classroom));
                delete classroom.enrolled_courses[courseId];
                Classroom.findByIdAndUpdate(classroomId,classroom,{new:true})
                    .then((updatedClassroom)=>resolve(updatedClassroom)).catch(err=>{
                    reject({
                        message:"unable to remove course from classroom ",
                        statusCode:503,
                        trace:err
                    })
                })

            }).catch((err)=>{
                reject({
                    message:"unable to find classroom ",
                    statusCode:503,
                    trace:err
                })
            })
        })
    }

};