const Sequelize=require("sequelize");
const {sequelize}=require("../db/mySQLConnection");
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
        type: Sequelize.DATE,
        default:Sequelize.NOW
    },
    'updated_at':{
        type: Sequelize.NOW
    }

},{
    underscored: true
});
Assignment.associate=(model)=>{
    Assignment.belongsTo(model.Courses);
    Assignment.hasMany(model.AssignmentSubmissions);
};
module.exports=Assignment;