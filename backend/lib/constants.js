const types = {
    MATCHING_REQUEST: "matching-request" 
}

const status = {
    PENDING:  "pending",
    READ:     "read",
    APPROVED: "approved"
}

const mailOptions = {
    matchingRequest: {
        MATCHING_REQUEST_PENDING_SUBJECT: "matching-request is pending",
        MATCHING_REQUEST_PENDING_BODY: "Hello,\n\nYou have a matching request from <username> .\nPlease click here for more information.\n\nYours,\nSafePairing App",
        MATCHING_REQUEST_APPROVED_BODY: "Hello,\n\nYour matching request has been approved by <username> .\nPlease click here for more information.\n\nYours,\nSafePairing App"
    }
}

module.exports = {
    types,
    status,
    mailOptions
};