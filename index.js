const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let id = 0;

app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });

  socket.on('delete', (id) => {
    console.log(`deleting: ${id}`);
    io.emit('delete', id);
  });

  socket.on('add', (obj) => {
    console.log(`adding: ${JSON.stringify(obj)}`);
    io.emit('add', {
      id: id++,
      name: obj.name,
      os: obj.os,
      capacity: 0,
      volumes: 0
    });
  });
});

app.get('/servers', (req, res) => {
  const servers = [
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
  res.send(JSON.stringify(servers))
});


http.listen(3003, () => {
  console.log('listening');
});
