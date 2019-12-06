const bcrypt = require('bcrypt');
const session = require('express-session');
const cookie = require('cookie');

const saltRounds = 10;

// MIDDLEWARES
const file = {};

file.getPrevious = (req, res, next) => {
  res.locals.pool.options.connectionString = 'postgres://jiqoikud:Zf9rq6T9_LqglYgGNJnsb_eseI0PaZB7@isilo.db.elephantsql.com:5432/jiqoikud'
  
  // console.log("this is res.lcaols", res.locals)
  // console.log("this is res.locals.pool", res.locals.pool)
  // console.log("this is the connection string", res.locals.pool.connectionString)
  const db = res.locals.pool;
  // console.log("this is DB query", db.query)
  const previousQuery = `SELECT * FROM queries;`

  db.query(previousQuery,(err, result)=>{
    // console.log("YESSS!", result)
    if (err) {
      return next({log: err.stack, message: "Error executing query in getData"}) 
    }
    // console.log("this is the res", res)
    // console.log("we got a ressssss and here are the rows", result.rows)
    res.locals.previousqueries = result.rows;
   return next();
 })
}

// Adds search query into previous query table

file.addQuery = (req, res, next) => {


  res.locals.pool.options.connectionString = 'postgres://jiqoikud:Zf9rq6T9_LqglYgGNJnsb_eseI0PaZB7@isilo.db.elephantsql.com:5432/jiqoikud'

  const db = res.locals.pool;

  // console.log("this is the req.body", req.body)

  const addQueryQuery = `INSERT INTO queries (user_id, url) VALUES (1, '${req.body}');`

    db.query(addQueryQuery,(err, result)=>{
      // console.log("YESSS!", result)
      if (err) {
        return next({log: err.stack, message: "Error executing query in getData"}) 
      }
      // console.log("******* this is results", result.rows[0])
      // console.log("this is the res", res)
      // res.locals.info = result.rows;
      // console.log("you supposedly did it!")
     return next();
   })
  }

// Get table data from database
file.getData = (req, res, next) => {
const db = res.locals.pool;
  // console.log(db)
  const { queryString } = req.body

  db.query(queryString,(err, result)=>{
    // console.log("YESSS!", result)
    if (err) {
      return next({ log: err.stack, message: 'Error executing query in getData' });
    }
    // console.log("this is the res", res)
    res.locals.info = result.rows;
    return next();
  });
};

// Get table names middleware to display on dropdown menu after fetching database
file.getTableNames = (req, res, next) => {
  const db = res.locals.pool;
  // write code here
  const queryString = "select tablename from pg_catalog.pg_tables where schemaname != 'pg_catalog' AND schemaname != 'information_scehma'";

  db.query(queryString, (err, result) => {
    if (err) {
      return next({ log: err.stack, message: 'Error executing query in getTableNames' });
    }
    res.locals.tableName = result.rows;
    return next();
  });
};

// Update/Patch Middleware
file.update = (req, res, next) => {
  const db = res.locals.pool;
  // write code here
  const { queryString } = req.body;

  db.query(queryString, (err, result) => {
    if (err) {
      return next({ log: err.stack, message: 'Error executing query in update' });
    }
    res.locals.new = result.rows;
    return next();
  });
};

// Delete middleware
file.delete = (req, res, next) => {
  const db = res.locals.pool;
  // write code here
  const { queryString } = req.body;

  db.query(queryString, (err, result) => {
    console.log('result:', result);

    if (err) {
      return next({ log: err.stack, message: 'Error executing query in delete' });
    }
    res.locals.delete = result.rows;
    console.log('res.locals.delete:', res.locals.delete);

    return next();
  });
};


file.create = (req, res, next) => {
  const db = res.locals.pool;
  const { queryString } = req.body;

  db.query(queryString, (err, result) => {
    if (err) {
      return next({ log: err.stack, message: 'Error executing query in create' });
    }
    res.locals.create = result.rows;
    return next();
  });
};


// create new user middleware
file.createUser = (req, res, next) => {
  const db = res.locals.pool;

  // pull password and email from rec.body
  const { email, password } = req.body;

  // create custom queryString
  const queryString = 'INSERT INTO Users (email,password) VALUES ($1,$2)';

  // check that middleware is firing
  console.log('Firing createUser');

  // bcrypt hashing
  bcrypt.hash(password, saltRounds, (err, hash) => {
    const values = [email, hash];
    db.query(queryString, values, (err, result) => {
      if (err) {
        console.log('THIS IS ERROR:', err);
        return next({ log: err.stack, message: 'Error executing query in createUser' });
      }
      console.log('User saved to dbase');
      return next();
    });
  });
};

// login user
file.loginUser = (req, res, next) => {
  // query object
  const db = res.locals.pool;

  // log to console the initiation of this middleware
  console.log('Fired LoginUser Middleware');

  // log req body
  console.log('request body:', req.body);

  // create session

  // destructure email and password from front end to authenticate user
  const { email, password } = req.body;

  // create query string
  const queryString = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}';`;


  // check if user/passwrd match exist in database
  // TODO: BCRYPT password for auth
  db.query(queryString, (err, result) => {
    if (err) {
      console.log('THIS IS DATABASE QUERY ERROR:', err);
      return next({ log: err.stack, message: 'Error executing query in createUser' });
    }

    // save user results from databse to constant
    const dbuser = result.rows[0];

    // bcrypt compare
    bcrypt.compare(password, dbuser.password, (error, cryptresult) => {
      if (err) {
        console.log('bcrypt auth failed');
        res.locals.auth = { login: 'Failed' };
        res.status(403).send();
      } else {
        res.locals.auth = { login: 'Successful' };
        // setting our cookie
        res.cookie('email', email);
      }
    });

    // if user view email matches dbemail and view password matches dbpassword log open sesamse
    if (email === dbuser.email && password === dbuser.password) {
      console.log('open sesame');


      // setting our cookie
      res.cookie('email', email);

      // assign success object to res.local.auth
      res.locals.auth = { login: 'Successful' };
      // TODO: on auth entication - create session/cookies - return token?
    } else {
      // on  failure assign res.locals.auth="LoginFailed"
      res.locals.auth = { login: 'Failed' };

      // TODO: REMOVE LOGS BELOW
      // console.log('Not a match');
      // console.log(`
      //  view email:${email}  | db email: ${dbuser.email}
      //  view password: ${password} | db password:${dbuser.password}
      // `);
    }
    return next();
  });
};


module.exports = file;
