const types = {
    MATCHING_REQUEST: "matching-request" 
}

const status = {
    PENDING:  "pending",
    READ:     "read",
    APPROVED: "approved",
    CANCELED: "canceled"
}

const mailOptions = {
    matchingRequest: {
        MATCHING_REQUEST_SUBJECT: "Matching-Request is <status>",
        MATCHING_REQUEST_PENDING_BODY: '<!DOCTYPE html>'+
        '<html><head><title>Matching-Request</title>'+
        '</head><body><div>'+
        '<div>'+
        '<div><em>Hello</em>,</div>'+
        '<div>&nbsp;</div>'+
        '<div>You have a <span style="color: #ff9900;"><strong>matching request</strong></span> from <username>.</div>'+
        '<div>Please <strong><a href="">click here</a></strong> for more information.</div>'+
        '<div>&nbsp;</div>'+
        '<div><em>Yours,</em></div>'+
        '<div><em>SafePairing App</em></div>'+
        '<div>&nbsp;</div>'+
        '</div>'+
        '</div></body></html>',
        MATCHING_REQUEST_BODY: '<!DOCTYPE html>'+
        '<html><head><title>Matching-Request</title>'+
        '</head><body><div>'+
        '<div>'+
        '<div><em>Hello</em>,</div>'+
        '<div>&nbsp;</div>'+
        '<div>Your matching request has been <strong><span style="color: #ff9900;"><status></span></strong> by <username>.</div>'+
        '<div>Please <strong><a href="">click here</a></strong> for more information.</div>'+
        '<div>&nbsp;</div>'+
        '<div><em>Yours,</em></div>'+
        '<div><em>SafePairing App</em></div>'+
        '<div>&nbsp;</div>'+
        '</div>'+
        '</div></body></html>'
    },
    emailConfirm: {
        EMAIL_CONFIRMATION_SUBJECT: "Email Confirmation - SafePairing",
        EMAIL_CONFIRMATION_BODY: '<!DOCTYPE html>'+
        '<div><em>Welcome <username>,</em>&nbsp;</div>'+
        '<div><br />'+
        '<div>'+
        '<div>Thanks for registering to SafePairing,</div>'+
        '<div>In order to complete the registration process, please confirm the following code: <strong><span style="color: #ff9900;"><code></span></strong></div>'+
        '<div>&nbsp;</div>'+
        '<div><em>Yours,</em></div>'+
        '<div><em>SafePairing App</em></div>'+
        '<div>&nbsp;</div>'+
        '</div>'+
        '</div></body></html>'
    }
}

module.exports = {
    types,
    status,
    mailOptions
};