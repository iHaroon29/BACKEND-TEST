const Sequelize=require("sequelize");
const sequelize=require("../../db/mySQLConnection");
const Course=require("./courses");
const Classroom=require("./classrooms");
const {Students} = require("./students");
const StudentCourse=sequelize.define("studentCourse", {
    'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'student_id':{
        type: Sequelize.INTEGER,
    },
    'course_id':{
        type: Sequelize.INTEGER,
    },
    'active':{
        type: Sequelize.BOOLEAN,
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
StudentCourse.belongsTo(Course,{foreignKey:"course_id"});
Course.hasMany(StudentCourse,{foreignKey:"course_id"});




Students.belongsTo(StudentCourse,{foreignKey:"student_id"});
StudentCourse.hasMany(Students,{foreignKey:"student_id"});

module.exports=StudentCourse;