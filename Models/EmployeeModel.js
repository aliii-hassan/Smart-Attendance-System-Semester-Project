const mongoose = require("mongoose");

const Employee = mongoose.model('Employee', new mongoose.Schema(
{
    firstName: {
        type: String,
        required: [ true, 'First Name is Required' ],
    },

    lastName: {
        type: String,
        required: [ true, 'Last Name is Required' ],
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: [ true, 'Company Reference is Required' ],
    },

    position: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeePosition',
        required: [ true, 'Position Reference is Required' ],
    },
}));

module.exports = { Employee, };