const transporter=require("../config/mail.config");
const email=require("../config/email").username;

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

