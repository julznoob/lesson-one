const http = require('http');
const fs = require('fs');
const path = require('path')

const hostname = '127.0.0.1';
const port = 3000;

const htmlServer = http.createServer((req, res) => {

    const reqUrl = new URL(req.url, `http://${hostname}:${port}`)

    // if we don't have an extension, add .html, otherwise, add nothing.
    const staticFilePath = path.normalize(path.format({
        dir: 'static',
        name: req.url,
        ext: !!path.parse(req.url).ext ? undefined : '.html',
    }))

    if (reqUrl.pathname === '/submit-here') {
        const { searchParams } = reqUrl
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })

        // I'm really starting to respect how much effort goes into simple data storage and retrieval

        searchParams.forEach((value, key) => {
            if (value && key) {
                const data = `timeStamp: ${Date.now().toString()}, ${key},${value}\n`
                const dataPath = path.normalize(path.format({
                    dir: 'data',
                    name: 'data.csv'
                }))
                fs.appendFile(dataPath, data, (err) => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log(`Successfully wrote ${data}`)
                    }
                })
            }
        })
        // search params are a set. Which is unexpected and a bit annoying.
        res.end(JSON.stringify([...searchParams]))
    }


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