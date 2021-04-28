const Sequelize=require("sequelize");
const sequelize=require("../db/mySQLConnection");
const Student=require("./students");
const Lecture=require("./lectures");
const LectureFeedbackCallbacks=require("./lectureFeedbackCallbacks");


const LectureFeedback=sequelize.define("lectureFeedback",{
    'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'url':{
        type: Sequelize.STRING,
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
LectureFeedback.belongsTo(Student);
LectureFeedback.belongsTo(Lecture);
LectureFeedback.belongsTo(LectureFeedbackCallbacks);
module.exports=LectureFeedback;
