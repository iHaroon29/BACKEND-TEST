const mongoose=require("../db/mongoDB");
const {Schema}=mongoose;
const HrRoomSchema=new Schema({
        new_hr_applicants:{
            type:Object,
            required:true,
        },
        hr_room_members:{
            type:Object, // HR's _id as key and timestamps as values
            required:true,
        },
        comments:{
            type:Array(Object),
            default:[],
        },
        room_name:{
            type:String,
        },
        description:{
            type:String,
        }
        

    },
    {
        timestamps:true,
    });
module.exports=mongoose.model("new_hr_room",HrRoomSchema);