const HrActivity=require("../../models/mongodb/HrActivity");

class ControllerClass{
    addNewHrActivity(activity){
        return new HrActivity(activity).save();
    }

}


const Controller=new ControllerClass();

module.exports.ActivityController=Controller;
module.exports.ActivityControllerClass=ControllerClass;
