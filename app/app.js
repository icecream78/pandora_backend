const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const logger = require('./logger');
const database = require('./database');
require('./config/passport');
const jwt = require('./jwt');

const app = express();
// routers require
const auth = require('./auth');
const lights = require('./lights');
const services = require('./services');

// Middlewares section
app.use((req, res, next) => {
  req.db = database;
  next();
});
app.use((req, res, next) => {
  req.logger = logger;
  next();
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false,
}));

// End middlewares section

// routes
app.use('/auth', auth);
app.use('/lights', jwt.required, lights);
app.use('/services', jwt.required, services);

app.get('/protected', jwt.required, (req, res) => {
  res.send('Hello World!');
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token...');
  }
  return next();
});


module.exports = app;
