const Sequelize=require("sequelize");
const {sequelize}=require("../db/mySQLConnection");
const Assignments=require("./assignments").Assignment;
const Students=require("./students").Students;
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
        type:Sequelize.DATE,
        default:Sequelize.NOW
    },
    'updated_at':{
        type:Sequelize.DATE,
    },
},{
    underscored: true
});

AssignmentSubmission.belongsTo(Assignments,{foreignKey:"assignment_id"});
Assignments.hasMany(AssignmentSubmission,{foreignKey:"assignment_id"});

AssignmentSubmission.belongsTo(Students,{foreignKey:"student_id"});
module.exports.AssignmentSubmission=AssignmentSubmission;