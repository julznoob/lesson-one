const http = require('http');
const fs = require('fs');
const path = require('path')

const hostname = '127.0.0.1';
const port = 3000;

const htmlServer = http.createServer((req, res) => {

    const staticFilePath = path.normalize(path.format({
        dir: 'static',
        name: req.url,
        ext: '.html',
    }))

    // TODO: handle other file types?
    // TODO: default to index file if there is one?

    fs.access(staticFilePath, (err) => {
        if (err) {
            console.log(err)
            res.writeHead(404, {
                'Content-Type': 'text/html'
            })
            res.end(`<h1>Nothing to see here</h1>`)
        } else {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(staticFilePath).pipe(res)
        }
    })
})

htmlServer.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});