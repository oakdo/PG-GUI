
const file = {};
 
file.getData = (req, res, next) => {
const db = res.locals.pool;
  // write code here
  const queryString ="select * from people";
 
  db.query(queryString, (err, result)=>{
    if (err) {
      return next({log: err.stack, message: "Error executing query"}) 
    }
    //console.log("result.rows:", result.rows)
    res.locals.info = result.rows;
   return next();
 })
}

module.exports = file;