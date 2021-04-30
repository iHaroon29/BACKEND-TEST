const Sequelize=require("sequelize");
const sequelize=require("../db/mySQLConnection").sequelize;
const Students=require("./students").Students;
const Classroom=require("./classrooms");
const ClassroomStudent=sequelize.define("classroomStudent",{
    "id":{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    "classroom_id":{
        type:Sequelize.INTEGER,
    },
    "student_id":{
        type:Sequelize.INTEGER,
    },
    "active":{
        type:Sequelize.BOOLEAN,
    },
    "created_at":{
        type:Sequelize.DATE,
        default:Sequelize.NOW
    },
    "updated_at":{
        type:Sequelize.DATE,
        default:Sequelize.NOW
    },
    "deleted_at":{
        type:Sequelize.DATE,
    },
},{
    underscored: true
});
ClassroomStudent.belongsTo(Classroom,{foreignKey:"classroom_id"});
Classroom.belongsTo(ClassroomStudent,{foreignKey:"id"});

Students.belongsTo(ClassroomStudent,{foreignKey:"student_id"});
ClassroomStudent.belongsTo(Students,{foreignKey:"student_id"});

module.exports=ClassroomStudent;


