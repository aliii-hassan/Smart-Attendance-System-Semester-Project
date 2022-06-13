const mongoose = require('mongoose');

const NumberOfEmployees = mongoose.model('NumberOfEmployees', new mongoose.Schema(
{
    minimumEmployees: {
        type: Number,
        required: [ true, 'Minimum Employees Count is Required' ],
    },

    maximumEmployees: {
        type: Number,
    },
}, 
{ 
    timestamps: true 
}));

module.exports = { NumberOfEmployees, };