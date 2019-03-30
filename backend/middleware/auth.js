const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token)
        res.status(401).send('Access denied. No token provided');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        console.log(decoded);
        req.user = decoded;
        next();
    }
    catch(ex) {
        res.status(400).send('Invalid token');
    }
}
