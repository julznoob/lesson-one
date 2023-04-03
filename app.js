const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const htmlServer = http.createServer((req, res) => {
    switch (req.url) {
        case '/htmlpipe':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream('index.html').pipe(res)
            break;
        case '/json':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(`{ "message": "mah messge" }`)
            break;
        case '/csv':
            res.writeHead(200, {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment;filename=goodstuff.csv'
            })
            res.end(`id,name,email\n1,Happy Plank,plank@forest.com`)
            break;
        default:
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.end(`<h1>Different response types</h1>
            <a href="/json">json</a>
            <a href="/htmlpipe">html pipe</a>
            <a href="/csv">csv</a>
            `)
            break;
    }
})

htmlServer.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});