const express = require('express');
const clc = require("cli-color");
require("dotenv").config();
var cors = require('cors');

// File Imports
const db = require("./database");

// Constatnts
const app = express();
const PORT = process.env.PORT || 3000;
var errMsg = clc.redBright.bold;
var notice = clc.blueBright.bold;
var warn = clc.yellowBright.bold;

// Middlewares
app.use(cors(
    {
      origin: ["https://employee-details-kqpd.onrender.com", "https://employee-details-mern.onrender.com", "http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true
    }
  ))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, ()=>{
    console.log(notice(`~~~ Server listeneing on port: ${PORT} ~~~`));
    console.log(notice.underline(`~~~ http://localhost:${PORT} ~~~`));
});

app.get("/", (req, res)=>{
    return res.status(200).json({
        message: "This is the root route, Server is online!",
        status: 200,
        error: false
    });
})