const express = require("express");
const clc = require("cli-color");
require("dotenv").config();
var cors = require("cors");
const session = require("express-session");
const mongoDbSession = require("connect-mongodb-session")(session);

//! File Imports
const db = require("./database");
const AuthRouter= require("./Controllers/AuthController");
const isAuth = require("./Middlewares/isAuthMiddleware");

//! Constatnts
const app = express();
const PORT = process.env.PORT || 3000;
const store = new mongoDbSession({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});
var errMsg = clc.redBright.bold;
var notice = clc.blueBright.bold;
var warn = clc.yellowBright.bold;

//! Middlewares
// app.use(cors())
app.use(
  cors({
    origin: [
      "https://employee-details-kqpd.onrender.com",
      "https://employee-details-mern.onrender.com",
      "http://localhost:5173",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "employee-secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//! Routes
app.use("/api/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(notice(`~~~ Server listeneing on port: ${PORT} ~~~`));
  console.log(notice.underline(`~~~ http://localhost:${PORT} ~~~`));
});

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "This is the root route, Server is online!",
    status: 200,
    error: false,
  });
});


app.get("/api/test", isAuth, (req,res)=>{
  return res.status(200).json({
    message: "locked in!",
    status: 200,
    error: false,
  });
})