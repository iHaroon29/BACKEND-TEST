const Sequelize=require("sequelize");
const sequelize=require("../db/mySQLConnection");

const LectureFeedbackCallbacks=sequelize.define("lectureFeedbackCallbacks",{
    'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    'lecture_feedback_id':{
        type: Sequelize.INTEGER,
    },
    'date':{
        type: Sequelize.DATE
    },
    'time':{
        type: Sequelize.TIME
    },
    'notified':{
        type: Sequelize.BOOLEAN,
        default:0,
    },
    'active':{
        type: Sequelize.BOOLEAN,
        default:1,
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

module.exports=LectureFeedbackCallbacks;