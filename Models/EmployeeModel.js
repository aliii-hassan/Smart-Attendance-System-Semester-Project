const mongoose = require("mongoose");

const Employee = mongoose.model('Employee', new mongoose.Schema(
{
    userProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [ true, 'User Profile is Required' ],
    },
    
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
}, 
{ 
    timestamps: true 
}));

module.exports = { Employee, };