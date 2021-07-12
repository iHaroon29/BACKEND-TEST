const Classroom = require("../models/classrooms.model");
const ClassroomValidator = require("../validators/classroom.validators");
const ServiceErrorMessage=require("../errors/serviceErrorMessage").getRejectResponse;
const ClassroomDAO=require("../dao/classroom.dao");
const ActivityLogger=require("../loggers/activity.logger");
const LOG_FOR_CLASSROOM=require("../config/LOGGERS_FOR").classroom;

function convertArrayToJSONWithTimeStamps(arr){
    if(!Array.isArray(arr)){
        return {};
    }
    const convertedJSON = {};
    for (let i of arr) {
        if (!convertedJSON[i])
            convertedJSON[i] = {
                createdAt: new Date(),
            };
    }
    return convertedJSON;
}


module.exports = {
    async addNewClassroom(classroomDetails,userDetail={}) {
        try{
            const validClassroomDetails=await ClassroomValidator.newClassroom(classroomDetails);
            validClassroomDetails.classroom_type="demo";
            validClassroomDetails.enrolled_courses = convertArrayToJSONWithTimeStamps(validClassroomDetails.courses);
            validClassroomDetails.enrolled_students=convertArrayToJSONWithTimeStamps( validClassroomDetails.students);
            validClassroomDetails.teachers = convertArrayToJSONWithTimeStamps(validClassroomDetails.teachers);
            const createdClassroomDetails=await ClassroomDAO.createNewClassroom(validClassroomDetails);
            await ActivityLogger.logActivityCreatedNew(createdClassroomDetails,LOG_FOR_CLASSROOM,userDetail).catch();
            return createdClassroomDetails;
        }catch (e) {
            console.log(e)
            throw ServiceErrorMessage("unable to create classroom",503,e)
        }
    },
    async deleteClassroomById(classroomId,userDetail={}) {
        try{
            const classroomDetails=await ClassroomDAO.deleteClassroomById(classroomId);
            await ActivityLogger.logActivityDeleted(classroomDetails,LOG_FOR_CLASSROOM,userDetail).catch();
            return classroomDetails;
        }catch (e) {
            throw ServiceErrorMessage("unable to create classroom",503,e)
        }
    },
    async updateClassroomById(classroomId, updateDetails,userDetails={}) {
        try{
            const validData=await ClassroomValidator.updateClassroomDetails(updateDetails);
            const oldData=await ClassroomDAO.getClassroomDetailsById(classroomId).catch()||{};
            const newData=await ClassroomDAO.updateClassroomDetailsById(classroomId,validData);
            await ActivityLogger.logActivityUpdated(oldData,newData,LOG_FOR_CLASSROOM,userDetails);
            return newData;
        }catch (e) {
            throw ServiceErrorMessage("unable to update classroom",503,e)
        }
    },
    getClassroomActivitiesByClassroomId(classroomId) {},
    getAllClassroom() {
        try{
            return ClassroomDAO.getAllClassroomDetails();
        }catch (e) {
            throw ServiceErrorMessage("unable to get all classrooms",5103,e);
        }
    },

    getAllCoursesInClassroom(classroomId) {
        return Classroom.findById(classroomId).then((classroomData) => {
            return classroomData.enrolled_courses;
        });
    },
    addNewDemoClassTeacherToClass(classroomId, teacherId) {
        return Classroom.findById(classroomId).then((classroomDetails) => {
            if (classroomDetails.demo_class[teacherId]) {
                throw new Error(
                    "A teacher already present for demo class remove it first"
                );
            }
            const demoClass = {};
            demoClass[teacherId] = { created_at: new Date() };
            return Classroom.findByIdAndUpdate(
                classroomId,
                {
                    demo_class: demoClass,
                },
                { new: true }
            ).then((savedDetails) => {
                return savedDetails;
            });
        });
    },
    async getClassroomDetailsByClassroomId(classroomId){
        return new Promise((resolve,reject)=>{
            ClassroomDAO.getClassroomFullDetailsByClassroomId(classroomId)
                .then(classroomDetails=>{
                    resolve(classroomDetails);
                }).catch(err=>{
                reject({
                    message:"unable to find classroom",
                    trace:err,
                    statusCode:503,
                })
            })
        })
    },
    addCourseInClassroom(){

    },
    async makeClassroomLiveUsingClassroomId(classroomId,userDetail={}){
        try{
            const oldData=await ClassroomDAO.getClassroomDetailsById(classroomId);
            const newData=await ClassroomDAO.updateClassroomDetailsById(classroomId,{classroom_type:"live"});
            await ActivityLogger.logActivityUpdated(oldData,newData,LOG_FOR_CLASSROOM,userDetail);
            return newData;
        }catch (e) {
            throw ServiceErrorMessage("unable to make classroom live",503,e)
        }
    },
    getAllDemoClassroom(){
        return new Promise((resolve,reject)=>{
            Classroom.find({"classroom_type":"demo"})
                .then(allDemoClassrooms=>{
                    resolve(allDemoClassrooms)
                }).catch(err=>{
                reject(ServiceErrorMessage("unable to update classroom",503,err))
            })
        })
    },
    getClassroomByStudentId(studentId){
            return new Promise((resolve,reject)=>{
                ClassroomDAO.getClassroomByStudentId(studentId)
                    .then(allClassrooms=>{
                        resolve(allClassrooms)
                    }).catch(err=>{
                    reject(ServiceErrorMessage("unable to find classroom",503,err))
                })
            })
    },
    async getClassroomsByTeacherId(teacher_id){
        try{
            const courses=ClassroomDAO.getClassroomByTeacherId(teacher_id);
            return  courses;
        }catch (e) {
            return ServiceErrorMessage("unable to get all classrooms",503,e);
        }
    },
};
