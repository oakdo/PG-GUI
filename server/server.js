const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const file = require('./controller')
const connectionPoint = require('./connection.js').connectionPoint
const bodyParser = require('body-parser');
// const
// let uri;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/dist',express.static(path.join(__dirname,'../dist')))
app.get('/', function (req, res) {
    //req.body should have uri
    res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
  })

app.post('/server/tablenames',
  connectionPoint.createConnection, file.getTableNames,(req,res) =>{
  return res.status(200).json(res.locals.tableName);
})

app.post('/server/table',
  connectionPoint.createConnection,file.getData, (req,res) =>{
  return res.status(200).json(res.locals.info);
})
  
app.listen(PORT, ()=> {console.log(`Listening on Port ${PORT}`)})

module.exports = app;


