const mongoose = require('mongoose');

const Country = mongoose.model('Country', new mongoose.Schema(
{
    countryName: {
        type: String,
        required: [ true, 'Country Name is Required' ],
    },
}));

module.exports = { Country, };