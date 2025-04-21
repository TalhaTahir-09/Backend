const { createServer } = require('node:http');
const hostname = '127.0.0.1'
const port = '3000'

const server = createServer((res, req) => {
    res.statusCode = 200
    res.headers = ('Content-Type', `text/html`)
    res.end(`<h1>Hello World<h1/>`)
})
server.listen(port, hostname, () => {
    console.log(`Server running at http:/${hostname}:${port}/`)
})
