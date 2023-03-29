const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;


// using a read stream. Don't fully understand this
const htmlPipeFileServer = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream('index.html').pipe(res)
});


// application json. You have to pass the json as a string, which is weird.
const jsonServer = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(`{ "message": "mah messge" }`)
});

// learnings: 
// setHeader is used by middleware to add and overwrite headers all willy nilly

// But writeHead is like the final, final one and should go just before the res.end is called

const csvServer = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment;filename=goodstuff.csv'
    })
    // will throw: cannot set headers after they are sent to the client
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/csv');
    // res.setHeader('Content-Disposition', 'attachment;filename=goodstuff.csv');
    res.end(`id,name,email\n1,Happy Plank,plank@forest.com`)
});


// Interesting. The parser will try to close tags if you don't. And random tags dont' break things
const htmlServer = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.end(`<h>Heyooo<h1>proper header<bananaman>stil works`)
})


htmlServer.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});