require('dotenv').config();
const {USER, DB_PORT, DATABASE, PASSWORD } = process.env;

module.exports={
    
database : {
  host: 'localhost',
  user: USER,
  password: PASSWORD,
  database: DATABASE, 
  port:DB_PORT
}

}