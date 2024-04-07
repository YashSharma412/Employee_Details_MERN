const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({ _id:String }, {strict: false});
const sessionModel = new mongoose.model("session", sessionSchema);
module.exports = sessionModel;