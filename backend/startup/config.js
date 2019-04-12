const config = require('config');

function isProvideJWT() { 
    if(!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not provided')
    }
}

module.exports.isProvideJWT = isProvideJWT;


