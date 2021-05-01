const Sequelize=require("sequelize");
const sequelize=require("../../db/mySQLConnection").sequelize;
const CourseSections=sequelize.define("courseSection",{
    'id':{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    "course_id":{
        type:Sequelize.INTEGER,
    },
    'name':{
        type:Sequelize.STRING,
    },
    'active':{
        type:Sequelize.BOOLEAN,
    },
    'created_at':{
        type:Sequelize.DATE,
        default:Sequelize.NOW
    },
    'updated_at':{
        type:Sequelize.DATE,
        default:Sequelize.NOW
    },
    'deleted_at':{
        type:Sequelize.DATE,
    },
},{
    underscored: true
});

module.exports=CourseSections;