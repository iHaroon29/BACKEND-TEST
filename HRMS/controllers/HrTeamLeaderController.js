const HrAdvisorController=require("./HrAdvisorController").ControllerClass;
const HrRoom=require("../models/mongodb/HrRooms");
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
                const newHrApplicats = validData.members.new_hr_applicant;
                const teamLeader = validData.members.team_leader;
                const hrAdvisor = validData.members.hr_adivisor;

                // delete validData.members.new_hr_applicant
                new HrRoom({
                    new_hr_applicants: newHrApplicats,
                    hr_room_members:{team_leader:teamLeader, hr_advisor:hrAdvisor},
                    room_name:validData.room_name,
                    description:validData.description
                }).save()
                .then(() => {
                    console.log('user created')
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