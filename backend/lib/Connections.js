class Connections{

    constructor() {
        this.connections = [];
    }

    addConnection(userId, socket) {
        this.connections[userId] = socket;
    }

    getConenction(userId) {
        return this.connections[userId];
    }

    removeConenction(socket) {
        for(let userId in this.connections) {
            if(this.connections[userId] == socket) 
                delete this.connections[userId];
        }
    }
}

module.exports = new Connections();