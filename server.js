'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('<h1 style="color:blue;">Pipeline test - version-2.0!! (New Feature 0002)</h1> \n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);