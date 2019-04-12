const jwt = require('jsonwebtoken');
const config = require('config');

const ioEvents = (io) => {
    const connections = require("../utils/Connections");
    io.sockets.on('connection', function(socket) {

        socket.on('subscribe', function(userId) {
            console.log(`username subscribed: ${userId}`);
            connections.addConnection(userId, socket);
        });

        socket.on('disconnect', () => {
            console.log('disconnected some user');
            connections.removeConenction(socket);
        });

    }); 
}

const initSocket = (app) => {
    const server 	= require('http').Server(app);
    const io 		= require('socket.io')(server);
    
    // // middleware socket authentication - only when sent token
    // io.use((socket, next) => {
    //     const token = socket.handshake.query.token; 
    //     // verify token
    //     jwt.verify(token, config.get('jwtPrivateKey') , (err, decoded) => {
    //       if(err){
    //            console.error(err);
    //            return next(err);
    //       }
    //       // set the user’s mongodb _id to the socket for future use
    //       socket._id = decoded._id;
    //       next();
    //     });
    // });

    ioEvents(io);
    return server;
}

module.exports = initSocket;