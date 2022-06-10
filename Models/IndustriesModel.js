const mongoose = require('mongoose');

const Industries = mongoose.model('Industries', new mongoose.Schema(
{
    industryName: {
        type: String,
        required: [ true, 'Industry Name is Required' ],
    },
}));

module.exports = { Industries, };