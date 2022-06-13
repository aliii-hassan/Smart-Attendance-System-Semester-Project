const mongoose = require('mongoose');

const City = mongoose.model('City', new mongoose.Schema(
{
    cityName: {
        type: String,
        required: [ true, 'City Name is Required' ],
    },

    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        required: [ true, 'State Reference is Required' ],
    },
    
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: [ true, 'Country Reference is Required' ],
    },
}, 
{ 
    timestamps: true 
}));

module.exports = { City, };