const env=require("dotenv");
env.config();
const Sequelize=require("sequelize");
const databaseName=process.env.DB_NAME || "test";
const username=process.env.DB_USERNAME || "root";
const password=process.env.DB_PASSWORD || "";

require("./mongoDB");
const DB_HOST=process.env.DB_HOST || 'localhost';
const DB_DIALECT=process.env.DB_DIALECT || 'mysql';
//
// console.log(DB_DIALECT,DB_HOST);

const connectionObject=new Sequelize(databaseName, username, password, {
        host: DB_HOST,
        dialect: DB_DIALECT,
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

module.exports.sequelize=connectionObject;
