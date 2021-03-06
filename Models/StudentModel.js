const mongoose = require("mongoose");

const Student = mongoose.model('Student', new mongoose.Schema(
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
}, 
{ 
    timestamps: true 
}));

module.exports = { Student, };