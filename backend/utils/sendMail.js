const constants = require('./constants');
const config = require('config');
const nodeMailer = require('nodemailer');

module.exports = (emailTo,subject,body,html) => {
    let transporterConfig = config.get("transporterConfig");
    transporterConfig.auth.pass = config.get("emailPass");
    let transporter = nodeMailer.createTransport(transporterConfig);
    let mailOptions = {
        to: emailTo,
        subject: subject,
        text: body,
        html: html
    };
    transporter.sendMail(mailOptions, (error, result) => {
        if(error){
            console.log(error);
        }
        console.log(result);
    });
}