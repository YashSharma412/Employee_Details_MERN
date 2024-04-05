const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    manager: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const departmentModel = mongoose.model("Department", departmentSchema);
module.exports = { departmentModel };