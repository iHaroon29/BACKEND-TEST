const Sequelize=require("sequelize");
const sequelize=require("../db/mySQLConnection");

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
LectureFeedback.assocate=(model)=>{
    LectureFeedback.belongsTo(model.Student);
    LectureFeedback.belongsTo(model.Lecture);
    LectureFeedback.belongsTo(model.LectureFeedbackCallbacks);
};
module.exports=LectureFeedback;
