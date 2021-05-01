var Sequelize = require('sequelize');
let {sequelize}=require("../../db/mySQLConnection");
module.exports.User= sequelize.define('user', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        primaryKey:false,
        required:true
    },
    email:{
        type:Sequelize.STRING,
        required:true

    },
    email_verified_at:{
        type:Sequelize.STRING,
        required:true

    },
    password:{
        type:Sequelize.STRING,
        required:true

    },
    remember_token:{
        type:Sequelize.STRING,
        primaryKey:false,
        required:true

    },

    'created_at':{
        type:Sequelize.DATE,
        default:Sequelize.NOW,
    },
    'updated_at':{
        type:Sequelize.DATE,
        default:Sequelize.NOW,
    },
    // 'deleted_at':{
    //     type:Sequelize.DATE,
    // },
},{
    underscored: true
});