const { Pool } = require('pg');
const uri = require('./server.js');

const PG_URI = 'postgres://gymyqkck:KDN5_PWumJO6UorMKuex8LLGBsTlISs8@salt.db.elephantsql.com:5432/gymyqkck';
const pool = new Pool({
    connectionString: PG_URI
  });
console.log("hi");  
module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };