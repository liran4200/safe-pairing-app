const config = require('config');
const winston = require('winston');

const logger = winston.createLogger({
        transports: [
          new winston.transports.Console({colorize: true, prettyPrint: true})
        ],
        exceptionHandlers: [
            new winston.transports.Console({colorize: true, prettyPrint: true})
        ]
 });

function isProvideJWT() { 
    if(!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not provided')
    }
}

module.exports.isProvideJWT = isProvideJWT;
module.exports.logger = logger;


