const winston = require('winston');

// currently log to console only
module.exports = winston.createLogger({
        transports: [
          new winston.transports.Console()
        ],
        exceptionHandlers: [
            new winston.transports.Console()
        ]
 });



