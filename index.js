const express = require('express');
const app = express();

app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3003, () => {
  console.log('listening');
});
