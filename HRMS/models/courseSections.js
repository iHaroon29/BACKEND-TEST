const Sequelize=require("sequelize");
const sequelize=require("../db/mySQLConnection").sequelize;
const Courses=require("./courses");
const CourseMaterials=require("./courseMaterials");
const CourseSections=sequelize.define("courseSection",{
    'id':{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    'name':{
        type:Sequelize.STRING,
    },
    'active':{
        type:Sequelize.BOOLEAN,
    },
    'created_at':{
        type:Sequelize.NOW,
    },
    'updated_at':{
        type:Sequelize.NOW,
    },
    'deleted_at':{
        type:Sequelize.NOW,
    },
});

CourseSections.belongsTo(Courses);
CourseSections.belongsTo(CourseMaterials);
module.exports=CourseSections;