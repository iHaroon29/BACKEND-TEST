const mongoose=require("../db/mongoDB");
const TrainerSchema=new mongoose.Schema({
    trainer_id:{
        type:String,
        required:true,
    },
    trainer_will_train_for_role:{
        type:String,
        required:true
    },
    trainer_own_role:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
module.exports=mongoose.model("trainer",TrainerSchema);