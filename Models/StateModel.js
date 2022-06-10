const mongoose = require('mongoose');

const State = mongoose.model('State', new mongoose.Schema(
{
    stateName: {
        type: String,
        required: [ true, 'State Name is Required' ],
    },
    
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: [ true, 'Country Reference is Required' ],
    },
}));

module.exports = { State, };