const db = require('./connection.js');

const file = {};

file.getCharacters = (req, res, next) => {
  // write code here
  const charQueryString ="select * from people";
  const charWithSpeciesAndHomeworld ="select ps.*, planets.name as homeworld from (select p.*, species.name as species from (select * from people) p inner join species on p._id = species._id) ps inner join planets on ps._id = planets._id";
  const charWithSpeciesHomeworldAndTitles = "select psf2.*, films.title from (select psf.* , people_in_films.film_id from (select ps.*, planets.name as homeworld from (select p.*, species.name as species from (select * from people) p inner join species on p._id = species._id) ps inner join planets on ps._id = planets._id) psf inner join people_in_films on psf._id = people_in_films.person_id) psf2 inner join films on psf2._id = films._id order by _id";
  db.query(charQueryString, (err, result)=>{
    if (err) {
      next({log: err.stack, message: "Error executing query"}) 
    }
    console.log("result:", result.rows)
    console.log("result.rows:", result.rows)
    next();
 })
}