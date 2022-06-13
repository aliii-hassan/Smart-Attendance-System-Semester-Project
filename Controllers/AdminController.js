const { Attendance } = require("../Models/AttendanceModel");
const { Users } = require("../Models/UsersModel");
const { Employee } = require("../Models/EmployeeModel");
const { Student } = require("../Models/StudentModel");

const AdminDashboard = async (request, response) => 
{
    var AttendanceModelObject = await Attendance
            .find()
            .populate("attendeeUser")
            .populate("attendeeProfile")
            .then( (FetchedData) => 
            {
                response.render("./AdminDashboard", {"AttendanceModelObject": FetchedData});
            })
            .catch( (Error) => 
            {
                console.log("ERROR: "+ Error);
            });

    
}

module.exports = {
    AdminDashboard, 
};