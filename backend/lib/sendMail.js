const constants = require('../lib/constants');
const config = require('config');
const nodeMailer = require('nodemailer');

module.exports = (emailTo, username) => {
    let transporterConfig = config.get("transporterConfig")
    transporterConfig.auth.pass = config.get("emailPass");
    const text = constants.mailOptions.matchingRequest.MATCHING_REQUEST_PENDING_BODY.replace("<username>", username);
    console.debug(`transporterConfig:\n ${transporterConfig}\n\n text: ${text}`);
    let transporter = nodeMailer.createTransport(transporterConfig);
    let mailOptions = {
        to: emailTo,
        subject: constants.mailOptions.matchingRequest.MATCHING_REQUEST_PENDING_SUBJECT,
        text: text
    };
    transporter.sendMail(mailOptions, (error, result) => {
        if(error){
            console.log(error);
        }
        console.log(result);
    });
}