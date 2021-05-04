const HrActivityController=require("./HrActivityController").ControllerClass;

class HrAdvisorControllerClass extends HrActivityController{
    addNewCallback() {

    }
    getCallback(){

    }
    getAllNewHrApplicants(){

    }
    exitHrRoom(){

    }
    getHrRoom(){

    }
    getAllRoomInWhichAddedAsMember(){

    }
    addRoomComment(){

    }
    addTeacherToClass(){

    }
    getAllClassrooms(){

    }
    getAllRoomComments(){

    }

}

const Controller=new HrAdvisorControllerClass();

module.exports.Controller=Controller;
module.exports.ControllerClass=HrAdvisorControllerClass;