const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dateCreated: {type: String, required: false}
});

const userDataSchema = new Schema({
    goalName: String,
    

    foreign_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
});

const Data = mongoose.model('Data', userDataSchema);
const User = mongoose.model('User', userSchema);

module.exports = { 
    User,
    Data
};