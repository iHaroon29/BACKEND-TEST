var Sequelize = require('sequelize');
let {sequelize}=require("../db/mySQLConnection");
module.exports.AdminRoles=sequelize.define("adminRole",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    admin_id:{
        type:Sequelize.INTEGER,
        primaryKey:false,
        required:true
    },
    role_id:{
        type:Sequelize.INTEGER,
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
    },
    deleted_at:{
        type:Sequelize.NOW,
        primaryKey:false
    }
});


