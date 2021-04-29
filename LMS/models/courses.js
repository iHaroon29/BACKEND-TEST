const Sequelize=require("sequelize");
const sequelize=require("../db/mySQLConnection").sequelize;
const Courses=sequelize.define("course",{
    'id':{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    'course_section_id':{
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
Courses.associate=(model)=>{
    Courses.belongsTo(modek.Classroom);
    Courses.hasMany(model.Assignments);
    Courses.hasMany(model.CourseSection);
};
module.exports=Courses;