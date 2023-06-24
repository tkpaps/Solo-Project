const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const cookieController = require('./controllers/cookie');
const userController = require('./controllers/userController');

const PORT = 3000;

const app = express();

const mongoURI = 'mongodb+srv://thomaskpappas:9TbWXn8GlVgb7ffk@soloprojectcluster.m9jqswl.mongodb.net/?retryWrites=true&w=majority';

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

app.use('/client', express.static(path.resolve(__dirname, '../client')));

// route handler for login/initial page and cookie creation
app.get('/', cookieController.setCookie, (req, res) => {
    console.log('GET request for cookie controller has fired');
    res.sendFile(path.resolve(__dirname, '../client/login.html'));
});

// route handler for signup page
app.get('/signup', (req, res) => {
    console.log('GET request for signup has fired');
    res.sendFile(path.resolve(__dirname, '../client/signup.html'));
});

// route handler for homepage
// app.get('/homepage', (req, res) => {
//     console.log('GET request for homepage has fired');
//     res.sendFile(path.resolve(__dirname, '../client/index.html'));
// })

// route handler for post request for creating a new user
app.post('/signup', userController.createUser, (req, res) => {
  console.log('POST request for signup has fired');
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

// route handler to verify login if user already has an account
app.post('/', userController.verifyUser, (req, res) => {
    console.log('POST request for verifyUser has fired')
    if (res.locals.user){
        res.sendFile(path.resolve(__dirname, '../client/index.html'));
    } else {
        res.redirect('/signup');
    }
});

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

// app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });

module.exports = app;