const express = require('express');
const path = require('path');

const cookieController = require('../controllers/cookieController');
const userController = require('../controllers/userController');
const goalController = require('../controllers/goalController');

const router = express.Router();

// route handler for cookie creation
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

// route handler to get goals on homepage load
router.get('/homepage', userController.requireAuth, goalController.getGoals, (req, res) => {
  console.log('GET Request for getGoals has fired');
  res.status(200).json(res.locals.goals);
});

// route handler to increment the goal progress
router.put('/homepage', goalController.incrementGoal, (req, res) => {
  console.log('PUT request for incrementGoal has fired');
  res.status(200).json(res.locals.goals);
});

// route handler to delete a goal
router.delete('/homepage', goalController.deleteGoal, (req, res) => {
  console.log('DELETE request for deleteGoal has fired');
  res.sendStatus(200);
});

// route handler to logout
router.get('/logout', (req, res) => {
  console.log('GET request for logging out has fired');
  console.log(req.session);
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out');
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.end();
  }
});

// route handler to check auth
router.get('/check-authentication', userController.requireAuth, (req, res) => {
  console.log('check authentication has fired');
  res.json(res.locals);
});

// route handler to get user name 
// *** this could be implemented in above route handler by adding this controller as the last middleware in the middleware chain ***
router.get('/getName', userController.getName, (req, res) => {
  console.log('GET request for getName has fired');
  res.json(res.locals.user);
});

// route handler to get about page
router.get('/about', (req, res) => {
  console.log('GET request for about page has fired');
  res.redirect('/about');
});

// route handler for header homepage link
router.get('/getHomepage', (req, res) => {
  console.log('GET request for get Homepage has fired');
  res.redirect('/homepage');
});

module.exports = router;