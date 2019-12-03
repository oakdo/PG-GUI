const express = require('express');
const app = express();
const PORT = 3000;
const { Pool } = require('pg');
let uri;

app.get('/', function (req, res) {
    //req.body should have uri
    
  })
  
app.listen(PORT, ()=> {console.log(`Listening on Port ${PORT}`)})

module.exports = uri;

