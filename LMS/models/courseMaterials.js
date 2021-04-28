const Sequelize=require("sequelize");
const sequelize=require("../db/mySQLConnection").sequelize;
const CourseSections=require("./courseSections");
const CourseMaterials=sequelize.define("courseMaterial",{
    'id':{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    'course_id':{
        type:Sequelize.INTEGER,
    },
    'name':{
        type:Sequelize.STRING,
    },
    'content':{
        type:Sequelize.STRING,
    },
    'topic':{
        type:Sequelize.INTEGER,
    },
    'time_required':{
        type:Sequelize.INTEGER,
    },
    'file':{
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
    }
});

CourseMaterials.associate=(model)=>{
    CourseMaterials.belongsTo(model.CourseSections);
};
module.exports=CourseMaterials;