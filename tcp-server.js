const fs = require('fs');
const net = require('net');

const PORT = 8000;

const server = net.createServer(socket => {
    console.log('Client connected');
    socket.on('data', data => {
        const request = data.toString();
        console.log('Received request:', request);
        console.log('Sending data')
        socket.write('HTTP/1.1 200 OK\r\n')
        socket.write('Content-Type: text/html\r\n')
        socket.write('\r\n') // this line break is crucial 
        // it lets the client know that the content is about to arrive.
        socket.write('<h1>Big things coming tomorrow</h1>')
        
        // if this .end statement never gets reached. Then the socket is tied up.
        // The client will get a spinny wheel in the browser.
        // The request does not complete properly.
        // I thought it would stop other sessions from reaching, but it doesn't

        // Actually I think the browser is serving cache. Because curl never returns.
        // And safari can't reach either. 
        // I think some chrome wizardry is happening.
        // Chrome handles it fine. Safari and curl don't 
        // socket.end();
    });
    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});