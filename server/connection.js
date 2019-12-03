const connectionPoint = {};
const { Pool } = require('pg'); 

connectionPoint.createConnection = (req, res, next) => {
  //grabbing the uri connection string to connect with 
  let {uri}=req.body;

//uri='postgres://gymyqkck:KDN5_PWumJO6UorMKuex8LLGBsTlISs8@salt.db.elephantsql.com:5432/gymyqkck'

const pool = new Pool({
    connectionString: uri
  });
  res.locals.pool=pool;
  
  return next();
}

module.exports = {connectionPoint,
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };