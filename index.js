const express = require('express');
const app = express();

app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/servers', (req, res) => {
  const servers = [{
    name: 'WEB',
    capacity: 1.0,
    volumes: 1
  }];
  res.send(JSON.stringify(servers))
});

app.listen(3003, () => {
  console.log('listening');
});
