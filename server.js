const express = require('express');

const app = express();

app.use(express.static('./dist/bus-buzz'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/bus-buzz/'}),
);

app.listen(process.env.PORT || 8080);
