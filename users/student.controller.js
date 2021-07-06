const ClassroomService=require("../services/classroom.course.services");
const AssignmentService=require("../services/assignment.service");
module.exports={
    async getAllClass(req,res){
        try{
            const allClassrooms=await ClassroomService.getAllClassroomByStudentId(req.user._id);
            return res.status(200).send(allClassrooms);
        }catch (e) {
            return res.status(e.statusCode||503).send(e);
        }
    },
    async getAllAssignmentUsingClassroomId(req,res){
        try{
            const allAssignments={};
            for(let classroomId of req.user.classsrooms){
                allAssignments[classroomId]=await AssignmentService.getAllAssignmentOfAClassroom(classroomId);
            }
            return res.status(200).send(allAssignments);
        }catch (e) {
            return res.status(e.statusCode||503).send(e);
        }
    },
};