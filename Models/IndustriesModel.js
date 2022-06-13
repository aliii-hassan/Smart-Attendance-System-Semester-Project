const mongoose = require('mongoose');

const Industries = mongoose.model('Industries', new mongoose.Schema(
{
    industryName: {
        type: String,
        required: [ true, 'Industry Name is Required' ],
    },
}, 
{ 
    timestamps: true 
}));

module.exports = { Industries, };