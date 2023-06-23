const express = require('express');
const path = require('path');

const cookieController = require('./controllers/cookie');

const PORT = 3000;

const app = express();

app.use(express.json());

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
app.get('/homepage', (req, res) => {
    console.log('GET request for homepage has fired');
    res.sendfile(path.resolve(__dirname, '../client/index.html'));
})

// global error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: err });
  });

app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });

module.exports = app;