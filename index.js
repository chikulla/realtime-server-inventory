const express = require('express');
const app = express();

app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/servers', (req, res) => {
  const servers = [
    {
      id: 0,
      name: 'WEB',
      capacity: 1.0,
      volumes: 1,
      os: 'Linux'
    },
    {
      id: 1,
      name: 'Cache',
      capacity: 5.5,
      volumes: 3,
      os: 'Linux'
    }
  ];
  res.send(JSON.stringify(servers))
});

app.listen(3003, () => {
  console.log('listening');
});
