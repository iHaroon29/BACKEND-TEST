const nodemailer=require("nodemailer");
const emailConfig=require("../config/email");

const GmailTransporter=nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'email',
        pass: "password"
    },
});

const DASTransporter=nodemailer.createTransport({
    host: 'https://webmail.digitalaidedschool.com',
    port: '587',
    auth: {
        user: emailConfig.username,
        pass: emailConfig.password,
        secureConnection: false,
    },
    tls: {
        rejectUnauthorized: false
    }
});
module.exports=DASTransporter;