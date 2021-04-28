const Sequelize=require("sequelize");
const sequelize=require("../db/mySQLConnection");

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
CourseTeachers.associate=(model)=>{
    CourseTeachers.belongsTo(model.Course);
    CourseTeachers.belongsTo(model.Teacher);
}
module.exports=CourseTeachers;