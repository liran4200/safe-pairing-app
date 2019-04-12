const constants = require('../lib/constants');
const config = require('config');
const nodeMailer = require('nodemailer');

module.exports = (emailTo,subject,body) => {
    let transporterConfig = config.get("transporterConfig");
    transporterConfig.auth.pass = config.get("emailPass");
    let transporter = nodeMailer.createTransport(transporterConfig);
    let mailOptions = {
        to: emailTo,
        subject: subject,
        text: body
    };
    transporter.sendMail(mailOptions, (error, result) => {
        if(error){
            console.log(error);
        }
        console.log(result);
    });
}