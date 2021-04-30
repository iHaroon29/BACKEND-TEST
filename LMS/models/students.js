var Sequelize = require('sequelize');
let sequelize=require("../db/mySQLConnection").sequelize;

const Classroom=require("./classrooms");
const Students=sequelize.define("student",{
    'id':{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    'name':{
        type: Sequelize.STRING,
        required:true
    },
    'email':{
        type: Sequelize.STRING,
        required:true,
        unique:true
    },
    'avatar':{
        type: Sequelize.STRING,
    },
    'address':{
        type: Sequelize.STRING
    },
    'age':{
        type: Sequelize.INTEGER,
    },
    'parent_name':{
        type: Sequelize.STRING,
        required:true
    },
    'parent_email':{
        type: Sequelize.STRING,
        unique:true
    },
    'parent_phone':{
        type: Sequelize.STRING,
    },
    'parent_alt_phone':{
        type: Sequelize.STRING,
    },
    'status':{
        type: Sequelize.STRING,
        default:0,
        required:true,
    },
    'active':{
        type: Sequelize.INTEGER,
        default:1,
        required:true,
    },
    'email_verified_at':{
        type: Sequelize.NOW,
    },
    'password':{
        type: Sequelize.STRING,
        required:true
    },
    'last_seen':{
        type: Sequelize.NOW,
    },
    'remember_token':{
        type: Sequelize.STRING,
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
Students.belongsTo(Classroom,{foreignKey:"id"});
module.exports.Students=Students;