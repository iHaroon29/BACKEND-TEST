const Sequelize=require("sequelize");
const sequelize=require("../db/mySQLConnection");
const Teachers=require("./teachers");
const LectureFeedback=require("./lectureFeedback");
const CrmMeetingLink=require("./crmMeetLinks");
const LectureReschedule=require("./lectureReschedules");
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

Lecture.belongsTo(Teachers);
Lecture.hasMany(LectureFeedback);
Lecture.hasMany(CrmMeetingLink);
Lecture.hasMany(LectureReschedule);


module.exports=Lecture;

