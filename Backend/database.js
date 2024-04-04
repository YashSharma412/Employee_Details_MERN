const mongoose = require("mongoose");
const clc = require("cli-color");

var errMsg = clc.redBright.bold;
var notice = clc.blueBright.bold;
var warn = clc.yellowBright.bold;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(notice("~~~~Mongodb connected successfully~~~~"));
  })
  .catch((err) => {
    console.log(errMsg(err));
  });
