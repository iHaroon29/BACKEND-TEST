const Sequelize=require("sequelize");
const {sequelize}=require("../db/mySQLConnection");
const Students=require("./students");
const Courses=require("./courses");
const Classroom=sequelize.define("classroom",{
    'id':{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    'name':{
        type:Sequelize.STRING,
    },
    'teacher_id':{
        type:Sequelize.INTEGER,
    },
    'course_id':{
        type:Sequelize.INTEGER,
    },
    'timeline':{
        type:Sequelize.JSON,
    },
    'status':{
        type:Sequelize.INTEGER,
    },
    'classroom_type':{
        type:Sequelize.INTEGER,
    },
    'created_at':{
        type:Sequelize.NOW,
    },
    'updated_at':{
        type:Sequelize.NOW,
    },
    'deleted_at':{
        type:Sequelize.NOW,
    },

});
Classroom.hasMany(Courses);
Classroom.hasMany(Students);
module.exports.Classroom=Classroom;