const HrAdvisorController=require("./HrAdvisorController").ControllerClass;
const HrRoom=require("../models/mongodb/HrRooms");
const HrActivityController=require("./HrActivityController");

//==================================================================================


class HrTeamLeaderController extends HrAdvisorController{
     createNewRoom(roomDetails){
            // Hr Applicant id, hr room members, comments(optional)
            roomDetails.hr_room_members = {
                hr_id: roomDetails.hr_id,
                hr_type: 'teamLeader',

            }
            roomDetails.new_hr_applicants = {
                new_hr_applicant_id: roomDetails.new_hr_applicant_id,
                
            }
            new HrRoom(roomDetails).save()
    }
     assignRoleToNewHrApplicant(){

    }
     incrementNewHrApplicantRound(){

    }
     rejectNewHrApplicant(){

    }
     acceptNewHrApplicant(){

    }
     addNewHrToHrRoom(){

    }
     addNewHrApplicantToHrRoom(){

    }
     addRoomName(){

    }
     addRoomDescription(){

    }
     deleteHrRoom(){

    }
     removeFromHrRoom(){

    }

}
const Controller=new HrTeamLeaderController();

module.exports=Controller;