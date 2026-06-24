const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello from Haris CICD Pipeline! v2 - deployed by webhook\n');
}).listen(3000, () => console.log('Running on port 3000'));
