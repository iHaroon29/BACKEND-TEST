const Sequelize=require("sequelize");
const sequelize=require("../../db/mySQLConnection");
const Lectures=require("./lectures");
const LectureReschedule=sequelize.define("lectureReschedule", {
    'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'lecture_id':{
        type: Sequelize.INTEGER,
    },
    'reason':{
        type: Sequelize.STRING,
    },
    'previous_date':{
        type: Sequelize.DATE,
    },
    'date':{
        type: Sequelize.DATE,
    },
    'previous_time':{
        type: Sequelize.TIME,
    },
    'time':{
        type: Sequelize.TIME,
    },
    'user_type':{
        type: Sequelize.STRING,
    },
    'rescheduled_by':{
        type: Sequelize.INTEGER,
    },
    'created_at':{
        type:Sequelize.DATE,
        default:Sequelize.NOW,
    },
    'updated_at':{
        type:Sequelize.DATE,
        default:Sequelize.NOW,
    },
    // 'deleted_at':{
    //     type:Sequelize.DATE,
    // },
},{
    underscored: true
});

LectureReschedule.belongsTo(Lectures);


module.exports=LectureReschedule;

