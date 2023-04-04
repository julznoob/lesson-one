const http = require('http');
const fs = require('fs');
const path = require('path')

const hostname = '127.0.0.1';
const port = 3000;

const htmlServer = http.createServer((req, res) => {

    const reqUrl = new URL(req.url, `http://${hostname}:${port}`)

    if (reqUrl.pathname === '/submit-here') {
        const { searchParams } = reqUrl
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })

        searchParams.forEach((value, key) => {
            if (value && key) {
                const dataPath = path.normalize(path.format({
                    dir: 'data',
                    name: key,
                    ext: '.txt',
                }))
                fs.writeFile(dataPath, value, (err) => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log(`Successfully wrote ${key}.txt`)
                    }
                })
            }
        })
        // search params are a set. Which is unexpected and a bit annoying.
        res.end(JSON.stringify([...searchParams]))
    }

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