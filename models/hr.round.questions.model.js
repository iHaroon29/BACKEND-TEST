const mongoose=require("../db/mongoDB");
const {Schema}=mongoose;
const HrRoundQuestionsSchema=new Schema({
        hr_round_id:{
            type:mongoose.ObjectId,
            required:true
        },
        questions:{
            type:Array(Object), // questions and answers in the object value
            required:true,
        }

    },
    {
        timestamps:true
    });

module.exports=mongoose.model("hr_round_question",HrRoundQuestionsSchema);
