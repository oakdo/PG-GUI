// I saved my github client_id and secret_id in .env file
require('dotenv').config();

const express = require('express');

const app = express();
const PORT = 3000;
const path = require('path');


// express session
const session = require('express-session');

// makes sending requests easy
const request = require('request');

// node core module, construct query string
const qs = require('querystring');

// node core module, parses url string into components
const url = require('url');

// generates a random string for the
const randomString = require('randomstring');

// random string, will be used in the workflow later
const csrfString = randomString.generate();

const redirect_uri = `${process.env.HOST}/signin/callback`;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const file = require('./controller');
const { connectionPoint } = require('./connection.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
  origin: 'http://localhost:8000/',
  credentials: true,
}));

// initializes session
// app.use(
//   session({
//     secret: randomString.generate(),
//     cookie: { maxAge: 60000 },
//     resave: false,
//     saveUninitialized: false,
//   }),
// );


// CHAOS FLOW
// app.use((req, res, next) => {
//   console.log(
//     `***************************************************************************************
//     CHAOS FLOW TEST --- METHOD:${req.method}, PATH: ${
//       req.url
//     }, BODY: ${JSON.stringify(req.body)}
//     ***************************************************************************************`
//   );
//   return next();
// });


app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// handles login integration with github
app.get('/githubsignin', (req, res, next) => {
  console.log('I am trying to run now!');
  // generate that csrf_string for the "state" parameter
  req.session.csrf_string = randomString.generate();
  // construct the GitHub URL to redirect the user to.
  // qs.stringify is a method that creates foo=bar&bar=baz
  // type of string.
  const githubAuthUrl = `https://github.com/login/oauth/authorize?${
    qs.stringify({
      client_id: process.env.CLIENT_ID,
      redirect_uri,
      state: req.session.csrf_string,
      scope: 'user:email',
      allow_signup: true,
    })}`;
  res.redirect(githubAuthUrl);
});

// Handle the response the application gets.
// Using app.all make sure no matter the provider sent you
// get or post request, they will all be handled
app.all('/signin/callback', (req, res) => {
  // Here, the req is request object sent by GitHub
  console.log('Request sent by GitHub: ');
  console.log(req.query);

  // req.query should look like this:
  // {
  //   code: '3502d45d9fed81286eba',
  //   state: 'RCr5KXq8GwDyVILFA6Dk7j0LbFNTzJHs'
  // }
  const { code } = req.query;
  const returnedState = req.query.state;

  // I check here to make sure state matches what is in session
  if (req.session.csrf_string === returnedState) {
    // If state matches up, send a post request to get access token
    request.post(
      {
        url:
          `https://github.com/login/oauth/access_token?${
            qs.stringify({
              client_id: process.env.CLIENT_ID,
              client_secret: process.env.CLIENT_SECRET,
              code,
              redirect_uri,
              state: req.session.csrf_string,
            })}`,
      },
      (error, response, body) => {
        // The response will contain the new access token
        // this is where you store the token somewhere safe
        // for this example we're just storing it in session
        console.log('Your Access Token: ');
        console.log(qs.parse(body));
        req.session.access_token = qs.parse(body).access_token;

        // Redirects user to /user page so we can use
        // the token to get some data.
        res.redirect('/user');
      },
    );
  } else {
    // if state doesn't match up, something is wrong
    // just redirect to homepage
    res.redirect('/');
  }
});

app.get('/user', (req, res) => {
  // GET request to get emails
  // this time the token is in header instead of a query string
  request.get(
    {
      url: 'https://api.github.com/user/public_emails',
      headers: {
        Authorization: `token ${req.session.access_token}`,
        'User-Agent': 'Login-App',
      },
    },
    (error, response, body) => {
      res.send(
        `<p>You're logged in! Here's all your emails on GitHub: </p>${
          body
        }<p>Go back to <a href="/">log in page</a>.</p>`,
      );
    },
  );
});

app.post('/server/tablenames',
  connectionPoint.createConnection, file.getTableNames, (req, res) => res.status(200).json(res.locals.tableName));

app.post('/server/table',
  connectionPoint.createConnection, file.getData, (req, res) => res.status(200).json(res.locals.info));

app.post('/server/update', connectionPoint.createConnection, file.update, (req, res) => res.status(200).json(res.locals.new));

app.post('/server/create', connectionPoint.createConnection, file.create, (req, res) => res.status(200).json(res.locals.create));

// createuser/signup end-point
app.post('/server/signup', connectionPoint.createConnection, file.createUser, (req, res) => res.status(200).send());

// user login end-point
app.post('/server/login', connectionPoint.createConnection, file.loginUser, (req, res) => res.status(200).json(res.locals.auth));

app.delete('/server/delete', connectionPoint.createConnection, file.delete, (req, res) => res.status(200).json(res.locals.delete));

app.listen(PORT, () => { console.log(`Listening on Port ${PORT}`); });

module.exports = app;
