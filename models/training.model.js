const mongoose=require("../db/mongoDB");
const TrainingSchema=new mongoose.Schema({
    trainer_id:{
        type:String,
        required:true,
    },
    trainee_id:{
        type:String,
        required:true,
    },
    trainee_role:{
        type:String,
        required:true,
    }
});
module.exports=mongoose.model("training",TrainingSchema);