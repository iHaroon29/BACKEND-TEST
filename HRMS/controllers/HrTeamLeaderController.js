const HrAdvisorController=require("./HrAdvisorController").ControllerClass;
const HrRoom=require("../models/mongodb/HrRooms");
const HrActivityController=require("./HrActivityController");

//==================================================================================


class HrTeamLeaderController extends HrAdvisorController{
     createNewRoom(){

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