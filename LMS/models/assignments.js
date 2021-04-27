const Sequelize=require("sequelize");
const {sequelize}=require("../db/mySQLConnection");
const Courses=require("./courses");
const AssignmentSubmissions=require("./assignmentSubmissions");
const Assignment=sequelize.define("assignment",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    'title':{
        type: Sequelize.STRING
    },
    'classroom_id':{
        type: Sequelize.BIGINT
    },
    'instructions':{
        type: Sequelize.STRING
    },
    'question_file':{
        type: Sequelize.STRING
    },
    'last_submission_date':{
        type: Sequelize.DATE
    },
    'created_at':{
        type: Sequelize.NOW
    },
    'updated_at':{
        type: Sequelize.NOW
    }

});
Assignment.belongsTo(Courses);
Assignment.hasMany(AssignmentSubmissions);
module.exports=Assignment;