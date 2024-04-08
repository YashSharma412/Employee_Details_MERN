const clc = require("cli-color");
// Constants
var errMsg = clc.redBright.bold;
var notice = clc.blueBright.bold;
var warn = clc.yellowBright.bold;

const getUser = (req, res) =>{
    return res.status(200).json({
        status: 200,
        message: "User data for currently logged in user",
        data: req.session.user,
    })
}

module.exports = {getUser}