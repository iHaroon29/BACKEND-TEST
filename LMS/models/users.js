var Sequelize = require('sequelize');
let {sequelize}=require("../db/mySQLConnection");
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
        primaryKey:false,
        required:true

    },
    email_verified_at:{
        type:Sequelize.STRING,
        primaryKey:false,
        required:true

    },
    password:{
        type:Sequelize.STRING,
        primaryKey:false,
        required:true

    },
    remember_token:{
        type:Sequelize.STRING,
        primaryKey:false,
        required:true

    },
    created_at:{
        type:Sequelize.NOW,
        primaryKey:false,
        required:true

    },
    updated_at:{
        type:Sequelize.NOW,
        primaryKey:false
    }
});
