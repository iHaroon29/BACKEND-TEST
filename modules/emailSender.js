const nodemailer=require("nodemailer");
const emailConfig=require("../config/email");
const email=emailConfig.username;
const password=emailConfig.password;
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password
    },
});
module.exports={
    sendMailWithOutAttachment(toAsStringCommaSeparated,subject,bodyInHtmlFormat){
        return new Promise((resolve,reject)=>{
            transporter.sendMail({
                from: email,
                to: toAsStringCommaSeparated,
                subject: subject,
                html: bodyInHtmlFormat,
            }).then(data=>{
                resolve(data);
            }).catch(err=>{
                reject(err);
            })
        })
    }
};

