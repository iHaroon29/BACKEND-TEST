const mongoose=require("../../db/mongoDB");
const {Schema}=require("../../db/mongoDB");

const StudentSchema=new Schema({
    'name':{
        type: String,
        required:true
    },
    'email':{
        type: String,
        required:true,
    },
    'avatar':{
        type: String,
    },
    'address':{
        type: String
    },
    'date_of_birth':{
        type: Number,
    },
    'parent_name':{
        type: String,
        required:true
    },
    'parent_relation':{
        type:String,
        required:true
    },
    'parent_email':{
        type: String,
    },
    'parent_mobile_number':{
        type: String,
    },
    'parent_alt_mobile_number':{
        type: String,
    },
    'active':{
        type: Boolean,
        default:true,
    },
    'email_verified_at':{
        type: Date,
    },
    'password':{
        type: String,
        required:true
    },
    'last_seen':{
        type: Date,
    },
},{
    timestamps: true
});
module.exports=mongoose.model("student",StudentSchema);