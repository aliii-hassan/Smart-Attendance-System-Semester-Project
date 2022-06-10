const mongoose = require("mongoose");

const Company = mongoose.model('Company', new mongoose.Schema(
{
    companyName: {
        type: String,
        required: [ true, 'Company Name is Required' ],
    },

    industry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Industries',
        required: [ true, 'Industry Reference is Required' ],
    },

    numberOfEmployees: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NumberOfEmployees',
        required: [ true, 'Number of Employees Reference is Required' ],
    },
}));

module.exports = { Company, };