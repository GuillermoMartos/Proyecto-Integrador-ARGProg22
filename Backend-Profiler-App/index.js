require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {PORT} = process.env;
// // const mysql = require("mysql");
// // const events = require("./src/db");
const morgan = require("morgan");

// var mysql = require('./mysql');


const app=express();
// // app.use(bodyParser.json());
// // app.use(cors());
// app.use(morgan("dev"));
// // app.use(events(connection));

//express settings
app.set('port', PORT)

//Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json())

//routes
app.use(require('./routes'))


app.listen(app.get('port'),()=>{
  console.log("express running in port _see .ENV_")
})


// const db_config={
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "argentinaprograma",
//   port:3005
// };

// // let connection = mysql.createConnection(db_config);



// // connection.connect(function(res, err) {
// //   if(res){
// //     connection.query("CREATE DATABASE mydb", function (err, result) {
// //       if (err) throw err;
// //       console.log("Database created");
// //     });
// //     console.log('connected as id ' + connection.threadId)
// //   //  return connection.query(
// //   //   'SELECT * FROM users',
// //   //   // [owner, 10*(req.params.page || 0)],
// //   //   (error, results) => {
// //   //     if (error) {
// //   //       console.log(error);
// //   //       // res.status(500).json({status: 'error', error:error});
// //   //     } else {
// //   //       console.log(results);
// //   //     }
// //   //   }
// //   // );
// //   }
// //     if (err) {
// //     console.error('error connecting: ' + err.stack);
// //     return;
// //   }
// // //  else return console.log('connected as id ' + connection.threadId);
// // });

// // // var connection = mysql.createPool(db_config);


// // // //-
// // // //- Establish a new connection
// // // //-
// // // connection.getConnection(function(err){
// // //     if(err) {
// // //         // mysqlErrorHandling(connection, err);
// // //         console.log("\n\t *** Cannot establish a connection with the database. ***");

// // //         connection = reconnect(connection);
// // //     }else {
// // //         console.log("\n\t *** New connection established with the database. ***")
// // //     }
// // // });


// // // //-
// // // //- Reconnection function
// // // //-
// // // function reconnect(connection){
// // //     console.log("\n New connection tentative...");

// // //     //- Create a new one
// // //     connection = mysql.createPool(db_config);

// // //     //- Try to reconnect
// // //     connection.getConnection(function(err){
// // //         if(err) {
// // //             //- Try to connect every 2 seconds.
// // //             setTimeout(reconnect(connection), 5000);
// // //         }else {
// // //             console.log("\n\t *** New connection established with the database. ***")
// // //             return connection;
// // //         }
// // //     });
// // // }


// // // //-
// // // //- Error listener
// // // //-
// // // connection.on('error', function(err) {

// // //     //-
// // //     //- The server close the connection.
// // //     //-
// // //     if(err.code === "PROTOCOL_CONNECTION_LOST"){    
// // //         console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
// // //         return reconnect(connection);
// // //     }

// // //     else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
// // //         console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
// // //         return reconnect(connection);
// // //     }

// // //     else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
// // //         console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
// // //         return reconnect(connection);
// // //     }

// // //     else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
// // //         console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
// // //     }

// // //     else{
// // //         console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
// // //         return reconnect(connection);
// // //     }

// // // });




// // app.get('/event', function (req, res, next) {
// //   connection.createQuery(
// //     'SELECT * FROM users',
// //     // [owner, 10*(req.params.page || 0)],
// //     (error, results) => {
// //       if (error) {
// //         console.log(error);
// //         res.status(500).json({status: 'error', error:error, prueba:connection.threadId});
// //       } else {
// //         res.status(200).json(results);
// //       }
// //     }
// //   );
// // });

// app.get('/', function (req, res, next) {
//   // connection.query(
//   //   'SELECT * FROM users',
//   //   // [owner, 10*(req.params.page || 0)],
//   //   (error, results) => {
//   //     if (error) {
//   //       console.log(error);
//   //       res.status(500).json({status: 'error', error:error});
//   //     } else {
//   //       res.status(200).json(results);
//   //     }
//   //   }
//   // );
//     mysql.getConnection(function(err, conn){
//         conn.query("select * from users", function(err, rows) {
//              res.json(rows);
//         })
//     })

//   res.json("holitas!")
// });

// app.listen(port, () => {
//     console.log(`Express server listening on port ${port}`)
//     // console.log(connection)
//   });




//   // module.exports = connection;






// // const port = 3306;
// // const app = express();
// // app.use(cors());
// // app.use(bodyParser.json());
// // app.use(events(connection));
// // app.use(morgan("dev"));

// // connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
// //   if (error) throw error;
// //   console.log("The solution is: ", results[0].solution);
// // });

// // connection.end();
// // app.get("/", (req, res) => {});
// // app.listen(port, () => {
// //   console.log(`Express server listening on port ${port}`);
// // });



