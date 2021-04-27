const Sequelize=require("sequelize");
const {sequelize}=require("../db/mySQLConnection");
const Assignments=require("./assignments");
const Students=require("./students");
const AssignmentSubmission=sequelize.define("assignmentSubmission",{
    'id':{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    'assignment_id':{
        type:Sequelize.INTEGER,
    },
    'student_id':{
        type:Sequelize.INTEGER,
    },
    'answer_file':{
        type:Sequelize.STRING,
    },
    'comments':{
        type:Sequelize.JSON,
    },
    'status':{
        type:Sequelize.JSON,
    },
    'created_at':{
        type:Sequelize.NOW,
    },
    'updated_at':{
        type:Sequelize.NOW,
    },
});

AssignmentSubmission.belongsTo(Assignments);
AssignmentSubmission.belongsTo(Students);
module.exports=AssignmentSubmission;