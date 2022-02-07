const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./src/db');


const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'asdasd',
    database : 'argentinaprograma'
  });
  
  connection.connect();
  
  const port = 3306;
  
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())
  app.use(events(connection));
  
  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });