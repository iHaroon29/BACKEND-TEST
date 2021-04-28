const Sequelize=require("sequelize");
const sequelize=require("../db/mySQLConnection");
const Student=require("./students");
const Lecture=require("./lectures");

const LectureAttendance=sequelize.define("lectureAttendance",{
    'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    'lecture_id':{
        type: Sequelize.INTEGER,
    },
    'student_id':{
        type: Sequelize.INTEGER,
    },
    'created_at':{
        type: Sequelize.NOW,
    },
    'updated_at':{
        type: Sequelize.NOW,
    },
    'deleted_at':{
        type: Sequelize.NOW,
    },
});
LectureAttendance.belongsTo(Student);
LectureAttendance.belongsTo(Lecture);


module.exports=LectureAttendance;