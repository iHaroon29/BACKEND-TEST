const env=require("dotenv");
env.config();
const Sequelize=require("sequelize");
const databaseName=process.env.DB_NAME | "test";
const username=process.env.DB_USERNAME | "root";
const password=process.env.DB_PASSWORD | "";

// const DB_HOST=process.env.DB_HOST | 'localhost';
// const DB_DIALECT=process.env.DB_DIALECT | 'mysql';
//
// console.log(DB_DIALECT,DB_HOST);



module.exports.sequelize= new Sequelize(databaseName, username, password, {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        define:{
            // enabling time-stamps for all tables
            timeStamp:true
        }
    }
);
