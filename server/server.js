const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
let uri;

app.get('/', function (req, res) {
    //req.body should have uri
    res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
  })
  
app.listen(PORT, ()=> {console.log(`Listening on Port ${PORT}`)})

module.exports = app;

