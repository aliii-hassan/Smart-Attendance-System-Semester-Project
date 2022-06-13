const mongoose = require('mongoose');

const EmailValidation = function (Email) 
{
    var emailValidatePattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailValidatePattern.test(Email);
};

const ContactValidation = function (Contact) 
{
    var ContactValidatePattern = /^([0|\+[0-9]{1,5})?([0-9]{10})$/;

    return ContactValidatePattern.test(Contact);
};


const Users = mongoose.model('Users', new mongoose.Schema(
{
    emailAddress: { 
        type: String,
        lowercase: true,
        unique: true,
        required: [ true, 'Email Address is Required' ],
        validate: {
            validator: EmailValidation,
            message: 'Email Address is Not Valid',
        },
    },

    password: { 
        type: String,
        required: [ true, 'Password is Required' ],
    },

    userType: { 
        type: String,
        enum: ['Company', 'Employee', 'Student', 'Admin'],
        required: [ true, 'User Type is Required' ],
    },

    isActivated: { 
        type: Boolean,
        default: false,
    },

    isApproved: { 
        type: Boolean,
        default: false,
    },

    streetAddress: {
        type: String,
    },

    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
    },

    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
    },
    
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
    },
    
    contact: {
        type: String,
        required: [ true, 'Contact is Required' ],
        validate: {
            validator: ContactValidation,
            message: 'Contact is Not Valid',
        }
    },
}, 
{ 
    timestamps: true 
}));

module.exports = { Users, };