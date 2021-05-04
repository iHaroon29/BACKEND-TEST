const mongoose=require("../../db/mongoDB");
const {Schema}=mongoose;
const HrRoomSchema=new Schema({
        new_hr_applicant_id:{
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
        }

    },
    {
        timestamps:true,
    });
module.exports=mongoose.model("new_hr_rooms",HrRoomSchema);