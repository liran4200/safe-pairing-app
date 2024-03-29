module.exports = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000","http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
    res.header("Access-control-allow-methods", "GET, POST, PUT, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
  
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
      next();
    }
  
}