const HrActivityController=require("./HrActivityController").ActivityControllerClass;
const NewHrApplicants=require("../models/mongodb/newHrApplicants");
const HrRooms=require("../models/mongodb/HrRooms");
const Classrooms=require("../models/mongodb/classrooms");
const HrRoomComment=require("../routes/DataValidators").HrRoomComment;
const Teachers=require("../models/mongodb/teachers");
const encrypt=require("../modules/bcrypt").genHash;
const connection=require("../db/mongoDB");

const rejectResponseFormat={
    message:"",
    trace:""
};



class HrAdvisorControllerClass extends HrActivityController{
    addNewCallback() {

    }
    getCallback(){

    }
    getAllNewHrApplicants(){
        return NewHrApplicants.find();
    }
    exitHrRoom(data){
        return new Promise((resolve, reject) => {
            this.addNewHrActivity(data)
                .then(()=>{
                    return HrRooms.findOneAndDelete({hr_room_members:data.HrId})
                }).catch(()=>{

            })
        })

    }
    getHrRoom(details){
        return HrRooms.find();

    }
    getAllRoomInWhichAddedAsMember(data){
        return HrRooms.find({hr_room_members:data.hr_id});

    }
    addRoomComment(details) {
        const Activity={
            hr_id:details.hr_id,
            activity:{
                name:"Added new comment to Hr room",
                comment:details.comment,
                room_id:details.room_id
            },
        };
        return this.addNewHrActivity(Activity)
            .then(()=>{
                if(!this.isHrIsEnrolledInRoom(details.hr_id,details.room_id))
                    return;
                return HrRooms.findByIdAndUpdate(details.room_id,{$push:{comments:details.comment}});

            }).catch(() => {
            });

    }

    addTeacherToClass(details){
        const Activity={
            hr_id:details.hr_id,
            activity:{
                name:"Added new demo teacher to classroom",
                classroom_id:details.classroom_id,
                teacher_id:details.teacher_id
            },
        };
        return new Promise((resolve, reject) => {
            Classrooms.findById(details.classroom_id)
                .then((LmsClass)=>{
                    if(!LmsClass)
                    {
                        // if no classroom exists with this classroom_id
                        rejectResponseFormat.message="No classroom found";
                        rejectResponseFormat.trace="classroom not found with id `"+details.classroom_id+"`";
                        reject(rejectResponseFormat);
                    }
                    const teacherToBeAddedInClass=LmsClass.demo_class;
                    if(LmsClass.demo_class.teacher)
                    {
                        // if a teacher is already present to take demo class
                        rejectResponseFormat.message="Unable to add teacher";
                        rejectResponseFormat.trace="Already a teacher to take demo class in classroom `"+details.classroom_id+"`";
                        reject(rejectResponseFormat);
                    }
                    teacherToBeAddedInClass.teacher={};
                    teacherToBeAddedInClass.teacher[details.teacher_id]={
                        created_at:Date.now(),
                    };
                    // add a teacher take demo class
                    Classrooms.findByIdAndUpdate(LmsClass._id,{"demo_class":teacherToBeAddedInClass},{useFindAndModify:false,new:true})
                        .then((updateLmsClass)=>{
                            encrypt(details.teacher_details.password)
                                .then((hashedPassword)=>{
                                    details.teacher_details.password=hashedPassword;
                                    Teachers.findOneAndUpdate({email:details.teacher_details.email},details.teacher_details,{upsert:true,useFindAndModify:false})
                                        .then((teacherDetails)=>{
                                            // console.log(teacherDetails)
                                            // adding into HRActivity for tracking purpose
                                            this.addNewHrActivity(Activity)
                                                .then((addedActivity)=>{
                                                    // activity logged
                                                    resolve({
                                                        teacher_details:teacherDetails,
                                                        classroom_details:LmsClass
                                                    })

                                                }).catch((errorInAddingActivity)=>{
                                                rejectResponseFormat.message="unable to log in hr activity";
                                                rejectResponseFormat.trace=errorInAddingActivity;
                                                reject(rejectResponseFormat)
                                            })
                                        }).catch((teacherSavingError)=>{
                                        rejectResponseFormat.message="unable to save teacher";
                                        rejectResponseFormat.trace=teacherSavingError;
                                        console.log(teacherSavingError)
                                        reject(rejectResponseFormat)
                                    })
                                }).catch(encryptionErr=>{
                                rejectResponseFormat.message="unable to encrypt password";
                                rejectResponseFormat.trace=encryptionErr;
                                reject(rejectResponseFormat);
                            })

                        }).catch((UpdateClassToAddNewTeacher)=>{
                        rejectResponseFormat.message="unable to add teacher to class";
                        rejectResponseFormat.trace=UpdateClassToAddNewTeacher;
                        reject(rejectResponseFormat);

                    })
                }).catch(unableToFindClassroom=>{
                rejectResponseFormat.message="unable to find classroom "+details.classroom_id;
                rejectResponseFormat.trace=unableToFindClassroom;
                console.log(unableToFindClassroom);
                reject(rejectResponseFormat);
            })
        })


    }
    getAllClassrooms(){
        return Classrooms.find();

    }
    getAllRoomComments(details){
        if(this.isHrIsEnrolledInRoom(details.hr_id,details.room_id)){
            return HrRooms.findById(details.room_id);
        }

        return new Promise(((resolve, reject) => {
            reject("not a member of the room");
        }))

    }
    getAllAvailableTeachers(){
        return Teachers.find({is_available:true});

    }
    isHrIsEnrolledInRoom(hrId,roomId){
        return new Promise(((resolve, reject) => {
            this.getAllRoomInWhichAddedAsMember({hr_id:hrId})
                .then(rooms=>{
                    for (let i = 0; i <rooms.length ; i++) {
                        if(rooms[i]._id===roomId)
                        {
                            return true;
                        }
                    }
                    return  false;
                }).catch(roomFindingError=>{
                reject(roomFindingError);
            })
        }))
    }

}

const Controller=new HrAdvisorControllerClass();

module.exports.Controller=Controller;
module.exports.ControllerClass=HrAdvisorControllerClass;