const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let id = 0;
let servers = [
  {
    id: id++,
    name: 'WEB',
    capacity: 1.0,
    volumes: 1,
    os: 'Linux'
  },
  {
    id: id++,
    name: 'Cache',
    capacity: 5.5,
    volumes: 3,
    os: 'Linux'
  }
];

app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', (req, res) => {
  console.log(res.connection.remoteAddress);
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });

  socket.on('delete', (id) => {
    console.log(`${socket.handshake.address}:deleting: ${id}`);
    io.emit('delete', id);
    const index = servers.findIndex((s) => s.id === id);
    if(index > -1) {
      servers.splice(index, 1);
    }
  });

  socket.on('add', (obj) => {
    console.log(`${socket.handshake.address}:adding: ${JSON.stringify(obj)}`);
    const server = {
      id: id++,
      name: obj.name,
      os: obj.os,
      capacity: 0,
      volumes: 0
    };
    io.emit('add', server);
    servers.push(server);
  });
});

app.get('/servers', (req, res) => {
  res.send(JSON.stringify(servers))
});


http.listen(3003, () => {
  console.log('listening');
});
