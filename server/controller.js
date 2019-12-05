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
      return next({log: err.stack, message: "Error executing query in getData"}) 
    }
    // console.log("this is the res", res)
    res.locals.info = result.rows;
   return next();
 })
}

// Get table names middleware to display on dropdown menu after fetching database
file.getTableNames = (req, res, next) => {
  const db = res.locals.pool;
    // write code here
    const queryString ="select tablename from pg_catalog.pg_tables where schemaname != 'pg_catalog' AND schemaname != 'information_scehma'";
   
    db.query(queryString, (err, result)=>{
      if (err) {
        return next({log: err.stack, message: "Error executing query in getTableNames"}) 
      }
      res.locals.tableName = result.rows;
     return next();
   })
 }

 // Update/Patch Middleware 
 file.update = (req, res, next) => {
  const db = res.locals.pool;
    // write code here
    const { queryString } = req.body
   
    db.query(queryString, (err, result)=>{
      if (err) {
        return next({log: err.stack, message: "Error executing query in update"}) 
      }
      res.locals.new = result.rows
     return next();
   })
 }

 // Delete middleware
 file.delete = (req, res, next) => {
  const db = res.locals.pool;
    // write code here
    const { queryString } = req.body
   
    db.query(queryString, (err, result)=>{
      console.log('result:', result)

      if (err) {
        return next({log: err.stack, message: "Error executing query in delete"}) 
      }
      res.locals.delete = result.rows
      console.log('res.locals.delete:', res.locals.delete)

     return next();
   })
 }


file.create = (req, res, next) => {
  const db = res.locals.pool;
  const { queryString } = req.body;

  db.query(queryString,(err, result)=>{
    if (err) {
      return next({log: err.stack, message: "Error executing query in create"}) 
    }
    res.locals.create = result.rows;
   return next();
  })
}

module.exports = file;