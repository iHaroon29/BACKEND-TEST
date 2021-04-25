const Sequelize=require("sequelize");
const {sequelize}=require("../db/mySQLConnection");
module.exports.Assignment=new Sequelize("assignment",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
    }

})