const cookieController = {};

cookieController.setCookie = (req, res, next) => {
    const randomNum = Math.floor(Math.random() * 100).toString();
    res.cookie('secret', randomNum);
    return next();
}

module.exports = cookieController;