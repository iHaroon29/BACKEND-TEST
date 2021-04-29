const Sequelize=require("sequelize");
const sequelize=require("../db/mySQLConnection");
const Course=require("./courses");
const Classroom=require("./classrooms");
const StudentCourse=sequelize.define("lectureReschedule", {
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
StudentCourse.associate=(model)=>{
    StudentCourse.belongsTo(model.Course);
    StudentCourse.belongsTo(model.Classroom);
};
module.exports=StudentCourse;