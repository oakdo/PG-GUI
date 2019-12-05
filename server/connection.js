const connectionPoint = {};
const { Pool } = require('pg');

connectionPoint.createConnection = (req, res, next) => {
  // Grab URI from POST request at input form
  // let {uri}=req.body;


  // URI to TEST
  // uri='postgres://gymyqkck:KDN5_PWumJO6UorMKuex8LLGBsTlISs8@salt.db.elephantsql.com:5432/gymyqkck'
  const uri = 'postgres://jiqoikud:Zf9rq6T9_LqglYgGNJnsb_eseI0PaZB7@isilo.db.elephantsql.com:5432/jiqoikud';

  // Connect to pool with URI from POST request
  const pool = new Pool({
    connectionString: uri,
  });
  res.locals.pool = pool;

  return next();
};

module.exports = {
  connectionPoint,
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
