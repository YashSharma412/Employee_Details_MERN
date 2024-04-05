const express = require("express");
const clc = require("cli-color");
const AuthRouter = express.Router();

// Constants
var errMsg = clc.redBright.bold;
var notice = clc.blueBright.bold;
var warn = clc.yellowBright.bold;

//! Helper functions import
const ValidateSignUpDetails = require("../Functions/ValidateSignUpDetails");
const User = require("../Models/UserModel");
const isAuth = require("../Middlewares/isAuthMiddleware");

AuthRouter.post("/signup", async (req, res) => {
  const { name, email, username, password, role, department } = req.body;

  //todo 1: Validate Signup Details
  try {
    await ValidateSignUpDetails({
      name,
      email,
      username,
      password,
      role,
      department,
    });
    console.log(warn("__Validated__"));
    console.log(req.body, "line: 21 in AuthController");
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: "Failed Validation check for SignUp form data ",
      error: err,
    });
  }

  //todo 2: Check wether user alredy exists in db we match the username or email for entries in db.
  try {
    await User.isUserAlreadyPresent({ username, email });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      status: 400,
      message: "Failed Sign up",
      error: err,
    });
  }

  //todo 3: Register/SignUp user to database !
  try {
    const userObj = new User({
      username,
      name,
      email,
      password,
      role,
      department,
    });
    const userDoc = await userObj.createUser();
    console.log(
      notice.bold("New User created in Database! line: 49 in AuthController")
    );
    console.log("usrDoc: ", userDoc);
    return res.status(201).json({
      message: "New User created in db succesfully!",
      status: 201,
      data: userDoc,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      status: 500,
      message: "Server Error",
      error: err,
    });
  }
});

AuthRouter.post("/login", async (req, res) => {
  const { loginId, password } = req.body;
  //todo 1: Validating data:
  if (!loginId || !password) {
    return res.status(400).json({
      status: 400,
      message: "Please provide username and password",
      error: "Please provide username and password",
    });
  }

  //todo 2: Find user in DB using loginId
  try {
    const userFound = await User.findUserInDB({ key: loginId });

    //todo 3: Compare passwords
    //  const isMatch = await bcrypt.compare(password, userDb.password);
    // if (!isMatch) {
    // return res.send({
    //     status: 400,
    //     message: "Password does not matched",
    // });
    // }
    if (userFound.password !== password) {
      return res.status(400).json({
        status: 400,
        message: "Password does not matched",
        error: "Password does not matched",
      });
    }

    //todo 4: Make session for logged in user

    req.session.isAuth = true;
    req.session.user = {
      userId: userFound._id, //BSON Error --> userDb._id.toString()
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      department: userFound.department,
      name: userFound.name,
    };
    //req.session.req_time='first'

    return res.status(200).json({
      status: 200,
      message: "Login successfull",
      data: userFound,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 500,
      message: "Server Error",
      error: err,
    });
  }
});

AuthRouter.post("/logout", isAuth, (req, res) => {
  // console.log(req.session.id);
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        message: "Server Error",
        error: err,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Logout successfull",
    });
  });
});

module.exports = AuthRouter;
