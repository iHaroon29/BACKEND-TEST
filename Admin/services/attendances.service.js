const Attendance =require("../../models/mongodb/lectureAttendances");
const LectureService=require("./lectures.service");
module.exports={
    markStudentAsPresentUsingClassroomIdAndLectureId(classroomId,studentId,lectureId,courseId){
        return new Attendance({
            student_id:studentId,
            lecture_id:lectureId,
            course_id:courseId
        }).save()
            .then(savedAttendance=>{
                return savedAttendance;
            })
    },
    getClassroomAttendanceStatsByClassroomId(classroomId){
        return LectureService.getAllLecturesOfClassroom(classroomId)
            .then(async allLectures=>{
                const totalLecturesInClassroom=await LectureService.getTotalLecturesInClassroom();
                const attendances={};
                for(let i=0;i<allLectures.length;i++){
                    await Attendance.find({lecture_id:allLectures[i]._id})
                        .then((oneLectureAttendance)=>{
                            attendances[allLectures[i]._id]=oneLectureAttendance;
                        })
                }
                attendances["total_lectures_in_classroom"]=totalLecturesInClassroom;
                return attendances
            })
    },
    getAttendanceByLectureId(lectureId){
        return Attendance.find({lecture_id:lectureId})
            .then(attendance=>{
                const presentStudents={};
                for(let i=0;i<attendance.length;i++){
                    // presentStudents.push(attendance[i].student_id);
                    if(!presentStudents[attendance[i].student_id]){
                        presentStudents[attendance[i].student_id]=[attendance[i]];
                    }else{
                        presentStudents[attendance[i].student_id].push(attendance[i]);
                    }
                }
                return presentStudents;
            })
    },
    getAttendanceByStudentId(studentId){
        return Attendance.find({student_id:studentId});
    },
    getAttendanceByCourseId(courseId){
        return Attendance.find({course_id:courseId});
    }
};