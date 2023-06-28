const models = require('../models/userModel');

const goalController = {};

goalController.addGoal = (req, res, next) => {

  const { goalName, count, goalNumber } = req.body;
  const input = { goalName, count, goalNumber };

  const userId = req.session.userId;
  input.foreign_id = userId;

  models.Data.create(input)
    .then(data => {
      console.log(data);
      res.locals.goals = data;
      return next();
    })
    .catch(error => {
      return next({
        log: 'an error occured in adding a goal',
        status: 400,
        message: 'an error occured in addGoal controller'
      });
    });
};

goalController.getGoals = (req, res, next) => {

  const foreignId = req.session.userId;  
     
  models.Data.find({ foreign_id: foreignId })
    .then(goals => {
      console.log(goals);
      res.locals.goals = goals;
      return next();
    })
    .catch(error => {
      return next({
        log: 'an error occured in adding a goal',
        status: 400,
        message: 'an error occured in addGoal controller'
      });
    });
};

goalController.incrementGoal = (req, res, next) => {

  const { goalName } = req.body;
  const userId = req.session.userId;
  const input = { goalName, foreign_id: userId };
  
  models.Data.findOneAndUpdate(
    input,
    { $inc: { count: 1 } },
    { new: true }
  )
    .then(data => {
      console.log(data);
      res.locals.goals = data;
      return next();
    })
    .catch(error => {
      return next({
        log: 'an error occured in adding a goal',
        status: 400,
        message: 'an error occured in addGoal controller'
      });
    });
};

module.exports = goalController;