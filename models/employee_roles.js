const mongoose=require("../db/mongoDB");
const Schema=mongoose.Schema;
const EmployeeRolesSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    team:{
        type:String,
        required:true
    }

});

module.exports=mongoose.model("employee_role",EmployeeRolesSchema);
