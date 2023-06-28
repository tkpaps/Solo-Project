const express = require('express');
const path = require('path');

const cookieController = require('../controllers/cookieController');
const userController = require('../controllers/userController');
const goalController = require('../controllers/goalController');

const router = express.Router();


// route handler for login/initial page and cookie creation
router.get('/', cookieController.setCookie, (req, res) => {
  console.log('GET request for cookie controller has fired');
  res.status(200);
});

// route handler for signup page
router.get('/signup', (req, res) => {
  console.log('GET request for signup has fired');
  res.status(200);
});

// route handler for post request for creating a new user
router.post('/signup', userController.createUser, (req, res) => {
  console.log('POST request for signup has fired');
  req.session.userId = res.locals.newUser._id;
  res.status(200).redirect('/homepage');
});

// route handler to verify login if user already has an account
router.post('/login', userController.verifyUser, (req, res) => {
  console.log('POST request for verifyUser has fired');
  // console.log(res.locals.user.id);
  if (res.locals.user){
    req.session.userId = res.locals.user._id;
    res.status(200).redirect('/homepage');
  } else {
    res.redirect('/signup');
  }
});

// route handler to add goal to specified username
router.post('/homepage', goalController.addGoal, (req, res) => {
  console.log('POST request for createGoal has fired');
  res.status(200).json(res.locals.goals);
});

router.get('/homepage', goalController.getGoals, (req, res) => {
  console.log('GET Request for user getGoals has fired');
  res.status(200).json(res.locals.goals);
});

// route handler to increment the goal progress
router.put('/homepage', goalController.incrementGoal, (req, res) => {
  console.log('PUT request for incrementGoal has fired');
  res.status(200).json(res.locals.goals);
});

module.exports = router;