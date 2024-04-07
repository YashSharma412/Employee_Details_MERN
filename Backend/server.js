const express = require("express");
require("dotenv").config();
const clc = require("cli-color");
var cors = require("cors");
const session = require("express-session");
const mongoDbSession = require("connect-mongodb-session")(session);

//! File Imports
const db = require("./database");
const authRouter= require("./Routes/authRoutes");

//! Constatnts
const app = express();
const PORT = process.env.PORT || 3000;
var errMsg = clc.redBright.bold;
var notice = clc.blueBright.bold;
var warn = clc.yellowBright.bold;
const store = new mongoDbSession({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});
const corsOption = {
  origin: [
    "https://employee-details-kqpd.onrender.com",
    "https://employee-details-mern.onrender.com",
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST"],
  credentials: true,
}
const sessionObject = {
  secret: "employee-secret",
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    httpOnly: true,
  }
}

//! Middlewares
// app.use(cors())
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionObject));

//! Routes
app.use("/api/auth", authRouter);

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