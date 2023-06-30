const models = require('../models/userModel');

const userController = {};

userController.createUser = (req, res, next) => {

  const newDate = Date.now();
  const dateCreated = new Date(newDate);

  const { username, password, email, firstName, lastName } = req.body;
  const input = { username, password, email, firstName, lastName, dateCreated };

  models.User.create(input)
    .then(data => {
      // console.log(data);
      res.locals.newUser = data;
      return next();
    })
    .catch (error => {
      return next({
        log: 'an error occured in creating a user',
        status: 400,
        message: 'an error occured in createUser controller'
      });
    });
};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const user = { username, password };

  models.User.findOne(user)
    .then(data => {
      // console.log(data);
      res.locals.user = data;
      return next();
    })
    .catch (error => {
      return next({
        log: 'an error occurred in verifying a user',
        status: 400,
        message: 'an error occurred in verifyUser controller'
      });
    });
};

userController.requireAuth = (req, res, next) => {
  // console.log(req.session);
  // console.log(req.session.userId);
  if (req.session && req.session.userId) {
    res.locals.isAuthenticated = true; // Add isAuthenticated to response locals
  } else {
    res.locals.isAuthenticated = false; // Add isAuthenticated to response locals
  }
  // console.log(res.locals.isAuthenticated);
  return next();
};

userController.getName = (req, res, next) => {
  
  const input = req.session.userId;

  // console.log(input);

  models.User.findOne({_id: input })
    .then(data => {
      // console.log(data);
      res.locals.user = data;
      return next();
    })
    .catch (error => {
      return next({
        log: 'an error occurred in getting user information',
        status: 400,
        message: 'an error occurred in getName controller'
      });
    });
};

module.exports = userController;