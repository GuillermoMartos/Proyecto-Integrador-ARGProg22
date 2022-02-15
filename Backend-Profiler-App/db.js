const mysql= require('mysql');
const {database}=require('./mysql')
const{promisify}=require('util')


const pool= mysql.createPool(database)

pool.getConnection((err, conn)=>{
  if(err){
    console.log(err.code)
  }
  if(conn){
    conn.release()
    console.log("DB connected!")
  } 
  return;
})

pool.query.multipleStatements=true
pool.query = promisify(pool.query)

module.exports=pool