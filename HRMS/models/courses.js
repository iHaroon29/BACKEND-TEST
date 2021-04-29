const Sequelize=require("sequelize");
const sequelize=require("../db/mySQLConnection").sequelize;
const Classroom=require("./classrooms");
const Assignments=require("./assignments");
const CourseSection=require("./courseSections");
const Courses=sequelize.define("course",{
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
Courses.belongsTo(Classroom);
Courses.hasMany(Assignments);
Courses.hasMany(CourseSection);
module.exports=Courses;