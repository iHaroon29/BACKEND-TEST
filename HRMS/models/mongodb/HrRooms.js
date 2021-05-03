const mongoose=require("../../db/mongoDB");
const {Schema}=mongoose;
const HrRoomSchema=new Schema({
        new_hr_applicant_id:{
            type:mongoose.ObjectId,
            required:true,
        },
        hr_room_members:{
            type:Object // HR's _id as key and timestamps as values
        }
    },
    {
        timestamps:true,
    });
module.exports=mongoose.model("new_hr_rooms",HrRoomSchema);