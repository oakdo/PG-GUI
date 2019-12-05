const bcrypt = require('bcrypt');

const saltRounds = 10;

// MIDDLEWARES
const file = {};

// Get table data from database
file.getData = (req, res, next) => {
  const db = res.locals.pool;

  const { queryString } = req.body;
  db.query(queryString, (err, result) => {
    if (err) {
      return next({ log: err.stack, message: 'Error executing query in getData' });
    }
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
  // const email = req.body.email;
  // const password = req.body.password;

  // create custom queryString
  const queryString = 'INSERT INTO Users (email,password) VALUES ($1,$2)';

  const password = 'bcryptedPasswrd';

  console.log('Firing createUser');

  bcrypt.hash(password, saltRounds, (err, hash) => {
    const values = ['foo64@MDLWARE.com', hash];
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

module.exports = file;
