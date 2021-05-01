const Sequelize=require("sequelize");
const sequelize=require("../../db/mySQLConnection");

const Lectures=require("./lectures");
const CourseTeacher=require("./courseTeachers");

const Teacher=sequelize.define("teacher",{
    'id':{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    'name':{
        type:Sequelize.STRING,
    },
    'email':{
        type:Sequelize.STRING,
    },
    'avatar':{
        type:Sequelize.STRING,
    },
    'qualification':{
        type:Sequelize.STRING,
    },
    'phone':{
        type:Sequelize.STRING,
    },
    'alt_phone':{
        type:Sequelize.STRING,
    },
    'address':{
        type:Sequelize.STRING,
    },
    'email_verified_at':{
        type:Sequelize.NOW,
    },
    'password':{
        type:Sequelize.STRING,
    },
    'last_seen':{
        type:Sequelize.NOW,
    },
    'active':{
        type:Sequelize.BOOLEAN,
    },
    'remember_token':{
        type:Sequelize.STRING,
    },
    'created_at':{
        type:Sequelize.DATE,
        default:Sequelize.NOW,
    },
    'updated_at':{
        type:Sequelize.DATE,
        default:Sequelize.NOW,
    },
    'deleted_at':{
        type:Sequelize.DATE,
    },
},{
    underscored: true
});

Teacher.hasMany(Lectures);
Teacher.belongsTo(CourseTeacher);

module.exports=Teacher;