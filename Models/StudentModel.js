const mongoose = require("mongoose");

const Student = mongoose.model('Student', new mongoose.Schema(
{
    firstName: {
        type: String,
        required: [ true, 'First Name is Required' ],
    },

    lastName: {
        type: String,
        required: [ true, 'Last Name is Required' ],
    },
}));

module.exports = { Student, };