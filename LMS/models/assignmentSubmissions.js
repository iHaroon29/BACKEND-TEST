const Sequelize=require("sequelize");
const {sequelize}=require("../db/mySQLConnection");
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

AssignmentSubmission.associate=(model)=>{
    AssignmentSubmission.belongsTo(model.Assignments);
    AssignmentSubmission.belongsTo(model.Students);
};
module.exports=AssignmentSubmission;