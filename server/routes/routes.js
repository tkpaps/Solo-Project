const express = require('express');
const path = require('path');

const cookieController = require('../controllers/cookieController');
const userController = require('../controllers/userController');

const router = express.Router();

// add a status to all route handlers**************************

// route handler for login/initial page and cookie creation
router.get('/', cookieController.setCookie, (req, res) => {
    console.log('GET request for cookie controller has fired');
    res.sendStatus(200).sendFile(path.resolve(__dirname, '../../client/login.html'));
});

// route handler for signup page
router.get('/signup', (req, res) => {
    console.log('GET request for signup has fired');
    res.sendFile(path.resolve(__dirname, '../../client/signup.html'));
});

// route handler for post request for creating a new user
router.post('/signup', userController.createUser, (req, res) => {
  console.log('POST request for signup has fired');
  res.sendFile(path.resolve(__dirname, '../../client/index.html'));
});

// route handler to verify login if user already has an account
router.post('/', userController.verifyUser, (req, res) => {
    console.log('POST request for verifyUser has fired')
    if (res.locals.user){
        res.sendFile(path.resolve(__dirname, '../../client/index.html'));
    } else {
        res.redirect('/signup');
    }
});

module.exports = router;