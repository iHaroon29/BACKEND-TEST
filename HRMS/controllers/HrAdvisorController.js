const HrActivityController=require("./HrActivityController").ControllerClass;
const NewHrApplicants=require("../models/mongodb/newHrApplicants");
const HrRooms=require("../models/mongodb/HrRooms");
const Classrooms=require("../models/mongodb/classrooms");
const Teachers=require("../models/mongodb/teachers");


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
    getHrRoom(){

    }
    getAllRoomInWhichAddedAsMember(data){
        return HrRooms.find({hr_room_members:data.hr_id});

    }
    addRoomComment(details) {
        this.addNewHrActivity()
            .then(()=>{

                if(!this.isHrIsEnrolledInRoom(details.hr_id,details.room_id))
                    return;



            }).catch(() => {
        });

    }

    addTeacherToClass(){

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