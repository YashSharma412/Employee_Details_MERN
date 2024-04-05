const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
{
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 100,
    trim: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["manager", "employee", "admin"],
    default: "employee",
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department' 
  },
},{
  timestamps: true,
});

const userModel = mongoose.model("User", userSchema);
module.exports = { userModel };
