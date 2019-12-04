
const file = {};
 
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

file.getData = (req, res, next) => {
const db = res.locals.pool;
  // write code here
  const { queryString } = req.body
  //add as an variable

  // const queryString='select * from '+tableName;

  db.query(queryString,(err, result)=>{
    
    if (err) {
      return next({log: err.stack, message: "Error executing query in getData"}) 
    }
    res.locals.info = result.rows;
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