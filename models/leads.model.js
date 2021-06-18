const mongoose=require("../db/mongoDB");
const Schema=require("../db/mongoDB").Schema;


const LeadsSchema=new Schema({
    is_active:{
        type:Boolean,
        default:true
    },
    hr_id:{
        type:Boolean,
        default:true
    },

});

module.exports=mongoose.model("lead",LeadsSchema);
