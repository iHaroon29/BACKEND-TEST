const Sequelize=require("sequelize");
const sequelize=require("../../db/mySQLConnection");
const {Lecture} = require("./lectures");
const {Students} = require("./students");

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
    },'created_at':{
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
// LectureAttendance.associate=(model)=>{
    LectureAttendance.belongsTo(Students);
    LectureAttendance.belongsTo(Lecture);
// };
module.exports=LectureAttendance;