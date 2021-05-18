const HrAdvisorController=require("./HrAdvisorController").ControllerClass;
const HrRoom=require("../../models/mongodb/HrRooms");
const HrActivityController=require("./HrActivityController");
const createNewRoomValidation = require('../routes/DataValidators').createNewRoom
//==================================================================================


class HrTeamLeaderController extends HrAdvisorController{
    createNewRoomForHr(req,res){
        // Hr Applicant id, hr room members, comments(optional)
        //get all room members, get room name, room description

        const roomDetails = req.body;
        createNewRoomValidation(roomDetails)
            .then((validData) => {
                new HrRoom({
                    new_hr_applicants: validData.members.new_hr_applicant,
                    hr_room_members:{
                        team_leader:validData.members.team_leader,
                        hr_advisor:validData.members.hr_advisor
                    },
                    room_name:validData.room_name,
                    description:validData.description
                }).save()
                    .then(() => {
                        return res.send('created').status(203)
                    }).catch(()=>{
                    return res.status(400).send('unable to create')
                })
            });
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