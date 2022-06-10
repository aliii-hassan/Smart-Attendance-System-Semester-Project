const mongoose = require("mongoose");

const EmployeePosition = mongoose.model('EmployeePosition', new mongoose.Schema(
{
    positionName: {
        type: String,
        required: [ true, 'Position Name is Required' ],
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: [ true, 'Company Reference is Required' ],
    },
}));

module.exports = { EmployeePosition, };