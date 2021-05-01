const Sequelize=require("sequelize");
const {sequelize}=require("../../db/mySQLConnection");
const Courses=require("./courses");
const Classroom=sequelize.define("classroom",{
    'id':{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    'name':{
        type:Sequelize.STRING,
    },
    'timeline':{
        type:Sequelize.JSON,
    },
    'status':{
        type:Sequelize.INTEGER,
    },
    'classroom_type':{
        type:Sequelize.INTEGER,
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
Classroom.hasMany(Courses,{foreignKey:"id"});

module.exports=Classroom;