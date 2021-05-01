const Sequelize=require("sequelize");
const sequelize=require("../../db/mySQLConnection").sequelize;
const CourseSections=require("./courseSections");
const Courses=sequelize.define("course",{
    'id':{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    'classroom_id':{
        type:Sequelize.INTEGER,
    },
    'title':{
        type:Sequelize.STRING,
    },
    'image':{
        type:Sequelize.STRING,
    },
    'description':{
        type:Sequelize.STRING,
    },
    'price':{
        type:Sequelize.DECIMAL,
    },
    'active':{
        type:Sequelize.BOOLEAN,
    },
    'createdAt':{
        type:Sequelize.DATE,
        default:Sequelize.NOW,
    },
    'updated_at':{
        type:Sequelize.NOW,
    },
},{
    underscored: true
});

CourseSections.belongsTo(Courses,{foreignKey:"course_id"});

module.exports=Courses;