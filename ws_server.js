let WebSocketServer = require('ws').Server;
let http = require('http');
let express = require('express');

let app = express();

app.use(express.static(__dirname + '/public'));

let server = http.createServer(app);
server.listen('8080');

let wsServer = new WebSocketServer({server: server});

wsServer.once('connection', function(ws) {
  let timer = setInterval(function() {
    ws.send(JSON.stringify(process.memoryUsage()), function(err) {
      if (err) throw err;
    });
  }, 100);
  console.log('client connected!!!');

  ws.on('close', function() {
    console.log('client disconnected!!!');
    clearInterval(timer);
  });
});
