class Connections{

    constructor() {
        this.connections = [];
    }

    addConnection(username, socket) {
        this.connections[username] = socket;
    }

    getConenction(username) {
        return this.connections[username];
    }

    removeConenction(socket) {
        for(let username in this.connections) {
            if(this.connections[username] == socket) 
                delete this.connections[username];
        }
    }
}

module.exports = new Connections();