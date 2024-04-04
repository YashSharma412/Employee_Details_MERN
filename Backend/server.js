const express = require('express');
const clc = require("cli-color");
require("dotenv").config();

// File Imports
const db = require("./database");

// Constatnts
const app = express();
const PORT = process.env.PORT || 3000;
var errMsg = clc.redBright.bold;
var notice = clc.blueBright.bold;
var warn = clc.yellowBright.bold;

// Middlewares
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

app.get("/api/jokes", (req, res)=>{
    const jokes = [
        {
            "id": 1,
            "title": "A joke",
            "content": "this is a joke"
        },
        {
            "id": 2,
            "title": "Another joke",
            "content": "this is another joke"
        },
    ];
    res.send(jokes);
})