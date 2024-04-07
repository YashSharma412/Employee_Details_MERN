// Initialize Router
const authRouter = require('express').Router();
const {isAuth} = require('../Middlewares/isAuthMiddleware');
//! Controllers
const {signInFunc, logInFunc, logOutFunc, logOutAllDevices} = require('../Controllers/AuthController');

authRouter.post("/signup", signInFunc);
authRouter.post("/login", logInFunc);
authRouter.get("/logout", isAuth, logOutFunc);
authRouter.get("/logoutAll", isAuth, logOutAllDevices)

module.exports  = authRouter;