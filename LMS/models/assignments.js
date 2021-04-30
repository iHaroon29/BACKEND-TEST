const Sequelize=require("sequelize");
const {sequelize}=require("../db/mySQLConnection");
const Courses=require("./courses");

const Assignment=sequelize.define("assignment",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    'title':{
        type: Sequelize.STRING
    },
    'course_id':{
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
Courses.hasMany(Assignment,{foreignKey:"id"});
Assignment.belongsTo(Courses,{foreignKey:"course_id"});


module.exports.Assignment=Assignment;