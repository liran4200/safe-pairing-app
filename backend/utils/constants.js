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
        MATCHING_REQUEST_SUBJECT: "matching-request is <status>",
        MATCHING_REQUEST_PENDING_BODY: "Hello,\n\nYou have a matching request from <username> .\nPlease click here for more information.\n\nYours,\nSafePairing App",
        MATCHING_REQUEST_BODY: "Hello,\n\nYour matching request has been <status> by <username> .\nPlease click here for more information.\n\nYours,\nSafePairing App",
    }
}

module.exports = {
    types,
    status,
    mailOptions
};