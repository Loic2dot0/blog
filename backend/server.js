require('dotenv').config();
const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Node server started');
});

server.listen(process.env.PORT || 3000);
