const HrActivityController=require("./HrActivityController").ActivityControllerClass;
const NewHrApplicants=require("../../models/hr.applicants.model");
const HrRooms=require("../../models/hr.rooms.model");
const Classrooms=require("../../models/classrooms.model");
const HrRoomComment=require("../routes/DataValidators").HrRoomComment;
const Teachers=require("../../models/teachers.model");
const encrypt=require("../../modules/bcrypt").genHash;
const connection=require("../../db/mongoDB");
const Employee=require("../../models/employees.model");


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
                    return HrRooms.findOneAndDelete({hr_room_members:data.hr_id})
                }).catch(()=>{

            })
        })

    }
    getAllHrRoom(details){
        return HrRooms.find();

    }
    getAllRoomInWhichAddedAsMember(data){
        return HrRooms.find({hr_room_members:data.hr_id});

    }
    addNewRoomComment(req,res) {
        const details=req.body;
        const Activity={
            hr_id:details.hr_id,
            activity:{
                name:"Added new comment to Hr room",
                comment:details.comment,
                room_id:details.room_id
            },
        };
        this.addNewHrActivity(Activity)
            .then(()=>{
                if(!this.isHrIsEnrolledInRoom(details.hr_id,details.room_id))
                    return res.send("You are not in this hr room").status(401);
                HrRooms.findByIdAndUpdate(details.room_id,{$push:{comments:details.comment}}).
                then((addedComment)=>{
                    return res.send(details.comment).status(202);
                }).catch(err=>{
                    return res.send("Unable to add your comment into the room").status(500);
                })

            }).catch(() => {
            return res.send("Unable to log in HrActivity").status(500);
        });

    }

    addTeacherIntoClassForDemo(req, res){
        const details=req.body;
        const Activity={
            hr_id:details.hr_id,
            activity:{
                name:"Added new demo teacher to classroom",
                classroom_id:details.classroom_id,
                teacher_id:details.teacher_id
            },
        };
        Classrooms.findById(details.classroom_id)
            .then((LmsClass)=>{
                if(!LmsClass)
                {

                    // if no classroom exists with this classroom_id
                    rejectResponseFormat.message="No classroom found";
                    rejectResponseFormat.trace="classroom not found with id `"+details.classroom_id+"`";

                    // reject(rejectResponseFormat);
                    return res.send(rejectResponseFormat).status(400);
                }
                const teacherToBeAddedInClass=LmsClass.demo_class;
                if(LmsClass.demo_class.teacher)
                {
                    // if a teacher is already present to take demo class
                    rejectResponseFormat.message="Unable to add teacher";
                    rejectResponseFormat.trace="Already a teacher to take demo class in classroom `"+details.classroom_id+"`";
                    return res.send(rejectResponseFormat).status(400);
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
                                        // adding into HRActivity for tracking purpose
                                        this.addNewHrActivity(Activity)
                                            .then((addedActivity)=>{
                                                return  res.send({
                                                    teacher_details:teacherDetails,
                                                    classroom_details:LmsClass
                                                }).status(202);

                                            }).catch((errorInAddingActivity)=>{
                                            rejectResponseFormat.message="unable to log in hr activity";
                                            rejectResponseFormat.trace=errorInAddingActivity;
                                            return res.send(rejectResponseFormat).status(400);
                                        })
                                    }).catch((teacherSavingError)=>{
                                    rejectResponseFormat.message="unable to save teacher";
                                    rejectResponseFormat.trace=teacherSavingError;
                                    console.log(teacherSavingError);
                                    return res.send(rejectResponseFormat).status(400);
                                })
                            }).catch(encryptionErr=>{
                            rejectResponseFormat.message="unable to encrypt password";
                            rejectResponseFormat.trace=encryptionErr;
                            return res.send(rejectResponseFormat).status(400);
                        })

                    }).catch((UpdateClassToAddNewTeacher)=>{
                    rejectResponseFormat.message="unable to add teacher to class";
                    rejectResponseFormat.trace=UpdateClassToAddNewTeacher;
                    return res.send(rejectResponseFormat).status(400);
                })
            }).catch(unableToFindClassroom=>{
            rejectResponseFormat.message="unable to find classroom "+details.classroom_id;
            rejectResponseFormat.trace=unableToFindClassroom;
            return res.send(rejectResponseFormat).status(400);
        })
    }
    getAllClassrooms(req,res){
        Classrooms.find()
            .then(classroom=>{
                return res.send(classroom).status(200);
            }).catch(err=>{
            return res.send("unable to find classrooms").status(500);
        })

    }
    getAllRoomComments(req,res){
        if(this.isHrIsEnrolledInRoom(req.body.hr_id,req.body.room_id)){
            HrRooms.findById(req.body.room_id).then(rooms=>{
                return res.send(rooms.comments).status(200);
            }).catch(errorInFindingRooms=>{
                return res.send(errorInFindingRooms).status(500);
            })
        }
        return res.status(401);
    }
    getAllAvailableTeachers(req,res){
        Teachers.find({is_available:true}).then(teachers=>{
            return res.send(teachers).status(200);
        }).catch(errorInFindingTeacher=>{
            return res.send(errorInFindingTeacher).status(500);
        })

    }
    isHrIsEnrolledInRoom(hrId,roomId){
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
            console.log("======================================")
            console.log(roomFindingError)
            console.log("======================================")
            return  false;
        })
    }
    getEmployeeById(req,res){
        Employee.findById(req.body.employee_id).then(employee=>{
            if(!employee)
                return res.status(400);
            return res.send(employee).status(200);
        }).catch(err=>{
            return res.send("Unable to find employee please try again later").status(500);

        })
    }

}

const Controller=new HrAdvisorControllerClass();

module.exports.Controller=Controller;
module.exports.ControllerClass=HrAdvisorControllerClass;