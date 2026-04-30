const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});
server.listen(3020, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3020/');
  process.exit(0);
});
