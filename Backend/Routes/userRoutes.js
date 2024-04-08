const userRouter = require('express').Router();
const {getUser} = require('../Controllers/UserController');
const { isAuth } = require('../Middlewares/isAuthMiddleware');

userRouter.get('/getUser', isAuth, getUser);

module.exports = userRouter;