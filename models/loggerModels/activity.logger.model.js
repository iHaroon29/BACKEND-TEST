const mongoose=require("../../db/mongoDB");
const ActivitySchema=new mongoose.Schema({
        activity_type:{
            required:true,
            type:String,
            lowercase:true
        },
        data:{
            type:Object,
            required:true
        },
        for:{
            type:Object,
            required:true
        },
        user:{
            type:Object,
            required:true
        }
    },
    {
        timestamps:true
    });
module.exports=mongoose.model("activity",ActivitySchema);