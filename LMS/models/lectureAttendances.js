const Sequelize=require("sequelize");
const sequelize=require("../db/mySQLConnection");

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
LectureAttendance.associate=(model)=>{
    LectureAttendance.belongsTo(model.Student);
    LectureAttendance.belongsTo(model.Lecture);
}


module.exports=LectureAttendance;