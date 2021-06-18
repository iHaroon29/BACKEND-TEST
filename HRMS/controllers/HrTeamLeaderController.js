const HrAdvisorController=require("./HrAdvisorController").ControllerClass;
const HrRoom=require("../../models/hr.rooms.model");
const HrActivityController=require("./HrActivityController");
const createNewRoomValidation = require('../routes/DataValidators').createNewRoom;
const Employee=require("../../models/employees.model");
const Roles = require('./AuthenticationAndAuthorizationController').ALLOWED_ROLES;
const HrApplicant = require('../../models/hr.applicants.model');
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
    assignRoleToNewHrApplicant(req,res){

        //employee id from request body
        const employeeDetails = req.body;
        const role = req.body.role;

        Employee.findByIdAndUpdate(employeeDetails.id, {role:role})
        .then(()=>{
           return res.send(role).status(200)
        }).catch((err)=>{
            return res.send(err).status(400)
        })

    }
    incrementNewHrApplicantRound(req,res){
        const hrApplicantDetails = req.body;
        const round = req.body.round;

        HrApplicant.findByIdAndUpdate(hrApplicantDetails.id, {hr_round_id:round})
        .then(()=>{
            hr_round_id

           return res.status(200).send(round)

        }).catch((err)=>{
           return res.status(400).send(err)

        })


    }
    rejectNewHrApplicant(req, res){
        // const hrApplicantDetails = req.body;
        const hrApplicantId = req.body.hrApplicantId;

        HrApplicant.findByIdAndUpdate(hrApplicantId, {status:"REJECT"})
        .then(()=>{
            return res.send(status).status(200)
        }).catch((err)=>{
            return res.send(err).status(400)
        })

    }
    acceptNewHrApplicant(req,res){
        // const acceptNewHrApplicant = req.body
        const newHrApplicantId = req.body.hrApplicantId;
        
        HrApplicant.findByIdAndUpdate(newHrApplicantId, {status:"ACCEPT"})
        .then(()=>{

            return res.send(status).status(200)

        }).catch((err)=>{
            return res.send(err).status(400)
        })

        

    }
    addNewHrToHrRoom(req,res){
        const roomId = req.body.roomId;
        const newMembers = {
            team_leader:req.body.team_leader,
            hr_advisor:req.body.hr_advisor,
        }
        HrRoom.findById(roomId)
        .then((data)=>{
            for(var x in data.hr_room_members.team_leader){
                newMembers.team_leader[x] = data.hr_room_members.team_leader[x]
            }
            for(var j in data.hr_room_members.hr_advisor){
                newMembers.hr_advisor[j] = data.hr_room_members.hr_advisor[j]
            }

            /*
            find room first via room id, 
            find room members with designation,
            add every members with designation 

            */

            HrRoom.findByIdAndUpdate(roomId, {hr_room_members:newMembers})
            .then(()=>{
               return res.send('ok').status(200)
            }).catch((err)=>{
               return res.send(err).status(400)
            })

        }).catch((err)=>{
            return res.send(err).status(400)
        })

    }
    addNewHrApplicantToHrRoom(req,res){
        const roomId = req.body;
        const newHrApplicantToHrRoom = req.body.newHrApplicant;

        HrRoom.findById(roomId)
        .then((data)=>{
            for(var x in data.new_hr_applicants){
                newHrApplicantToHrRoom[x] = new_hr_applicants[x]
            }

            HrRoom.findByIdAndUpdate(roomId,{new_hr_applicants:newHrApplicantToHrRoom})
            .then(()=>{
                return res.send('ok').status(200)

            }).catch((err)=>{
                return res.send(err).status(400)
            })

        }).catch((err)=>{
            return res.send(err).status(400)
        })



    }
    addRoomName(){
        

    }
    addRoomDescription(){

    }
    deleteHrRoom(req,res){
        const hrRoomID = req.body.roomId

        HrRoom.findByIdAndDelete(hrRoomID)
        .then(()=>{
            return res.send('ok').status(200)
        }).catch((err)=>{
            return res.send(err).status(400)
        })
    }
    removeFromHrRoom(){

    }

}
const Controller=new HrTeamLeaderController();

module.exports=Controller;