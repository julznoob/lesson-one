const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const htmlPipeFileServer = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream('index.html').pipe(res)
});

const jsonServer = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(`{ "message": "mah messge" }`)
});

const csvServer = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment;filename=goodstuff.csv'
    })
    res.end(`id,name,email\n1,Happy Plank,plank@forest.com`)
});

const htmlServer = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.end(`<h>Heyooo<h1>proper header<bananaman>stil works`)
})

htmlServer.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});