const Sequelize=require("sequelize");
const sequelize=require("../db/mySQLConnection");
const Teachers=require("./teachers");

const Lecture=sequelize.define("teacher", {
    'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'classroom_id':{
        type: Sequelize.INTEGER,
    },
    'date':{
        type: Sequelize.DATE,
    },
    'time':{
        type: Sequelize.TIME,
    },
    'attendance_marked':{
        type: Sequelize.BOOLEAN,
    },
    'crm_meet_link_id':{
        type: Sequelize.INTEGER,
    },
    'status':{
        type: Sequelize.INTEGER,
    },
    'active':{
        type: Sequelize.BOOLEAN,
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

Lecture.associate=(model)=>{
    Lecture.belongsTo(model.Teachers);
    Lecture.hasMany(model.LectureFeedback);
    Lecture.hasMany(model.CrmMeetingLink);
    Lecture.hasMany(model.LectureReschedule);
}


module.exports=Lecture;

