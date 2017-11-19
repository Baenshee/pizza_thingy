'use strict'

const http = require('http'),
    path = require('path'),
    express = require('express'),
    bodyParser = require("body-parser"),
    router = express(),
    server = http.createServer(router),
    io = require('socket.io').listen(server),
    jwt = require('jsonwebtoken'),
    cors = require('cors'),
    secret = 'I love the smell of Napalm in the morning.';

io.on('connection', (socket) => {
  console.log(`New user connected: ${socket}`);

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket}`);
  });
});


router.use(bodyParser.urlencoded({
  extended: true
}));

router.use(bodyParser.json());
router.use(cors());

require('./routes/pizza.js')(router, io, jwt, secret);
require('./routes/ingredients.js')(router, io);
require('./routes/users.js')(router, jwt, secret);

router.use(express.static(path.resolve(__dirname, 'client')));
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  /*let addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);*/
});