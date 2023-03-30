const fs = require('fs');
const net = require('net');

const PORT = 8000;

const server = net.createServer(socket => {
    console.log('Client connected');
    socket.on('data', data => {
        const request = data.toString();
        console.log('Received request:', request);
        socket.end();
    });
    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});