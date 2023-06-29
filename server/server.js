const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const router = require('./routes/routes');

const PORT = 3000;

const app = express();

const mongoURI = 'mongodb+srv://thomaskpappas:9TbWXn8GlVgb7ffk@soloprojectcluster.m9jqswl.mongodb.net/?retryWrites=true&w=majority';

// connect to MongoDB and listen on port 3000
mongoose.connect(mongoURI, err => {
  if (err) {
    console.error('MongoDB connection error:', err);
  } else {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup session functionality 
app.use(
  session({
    secret: 'tkpaps', 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoURI, 
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, 
    },
  })
);

// server static pages
app.use('/client', express.static(path.resolve(__dirname, '../client')));

// use all routes in routes folder
app.use('/api', router);

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('404 page not found'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


module.exports = app;
