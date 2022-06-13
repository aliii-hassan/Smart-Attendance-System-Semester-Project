const mongoose = require('mongoose');

const Attendance = mongoose.model('Attendance', new mongoose.Schema(
{
    attendeeUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Attendee User is Required'],
    },

    attendeeUserType: {
        type: String,
        required: [true, 'Attendee User Type Not Specified'],
        enum: ['Employee', 'Student'],
        required: [true, 'Attendee User Type is Required'],
    },

    attendeeProfile: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'attendeeUserType',
        required: [true, 'Attendee Profile is Required'],
    },

    attendanceDateAndTime: {
        type: Date,
        default: Date.now,
        required: [true, 'Attendance Date and Time is Required'],
    },

    attendeeIpAddress: {
        type: String,
        required: [true, 'IP Address of Attendee is Required'],
    },

    attendeeGpsLocation: {
        type: String,
        required: [true, 'GPS Location of Attendee is Required'],
    },
}, 
{ 
    timestamps: true 
}));

module.exports = { Attendance, };