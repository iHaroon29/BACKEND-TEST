const Sequelize=require("sequelize");
const sequelize=require("../db/mySQLConnection");
const Course=require("./courses");
const Teacher=require("./teachers");
const CourseTeachers=sequelize.define("courseTeacher",{
    'id':{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    'course_id':{
        type:Sequelize.INTEGER,
    },
    'teacher_id':{
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
CourseTeachers.belongsTo(Course);
CourseTeachers.belongsTo(Teacher);
module.exports=CourseTeachers;