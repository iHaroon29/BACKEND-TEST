const Classroom=require("../models/classrooms.model");
const ClassroomService=require("./classrooms.services");
module.exports={
    addCourseToStudentClassroom(studentId,courseId){
        const filter={};
        filter["enrolled_students."+studentId]={
            $exists:true,
        };
        return Classroom.find(filter)
            .then(classrooms=>{
                if (classrooms.length<1){
                    console.log("error");
                    throw new Error("No classroom found for the student")
                    // console.log("classrooms");
                    // (async ()=>{
                    //     classrooms[0]=await ClassroomService.addNewClassroom({name:"DIPU KUMAR SAH",students:[studentId]});
                    // })()
                }
                return (async()=>{
                    try{
                        for (let i=0;i<classrooms.length;i++)
                        {
                            classrooms[i]=await ClassroomService.addCourseInClassroom(classrooms[i]._id,courseId);
                        }
                        console.log(classrooms)
                        return classrooms;
                    }catch (e) {
                        throw new Error(e);
                    }
                })()
            })
    },
    removeCourseFromStudentClassroom(studentId,courseId){
        const filter={};
        filter["enrolled_students."+studentId]={
            $exists:true,
        };
        return Classroom.find(filter)
            .then(classrooms=>{
                return (async()=>{
                    try{
                        for (let i=0;i<classrooms.length;i++)
                        {
                            classrooms[i]=await ClassroomService.deleteCourseFromClassroom(classrooms[i]._id,courseId);
                        }
                        return classrooms;
                    }catch (e) {
                        throw new Error(e);
                    }
                })()
            })
    }

};
