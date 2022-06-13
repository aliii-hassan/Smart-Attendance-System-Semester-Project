const { Attendance } = require("../Models/AttendanceModel");
const { Users } = require("../Models/UsersModel");
const { Employee } = require("../Models/EmployeeModel");
const { Student } = require("../Models/StudentModel");

const InsertAttendance = async (request, response) => 
{
    // ACCEPTING FOLLOWING VARIABLES
    // { userAccountID, attendeeUserType, attendeeProfileID, attendanceDateAndTime, attendeeIpAddress, attendeeGpsLocation }

    var AttendanceModelObject = new Attendance();
    var UsersModelObject, EmployeeModelObject, StudentModelObject;

    if (!(request.body.userAccountID == null || request.body.userAccountID == ""))
    {
        UsersModelObject = await Users.findById(request.body.userAccountID);

        if (!(UsersModelObject == null || UsersModelObject == ""))
        {
            AttendanceModelObject.attendeeUser = UsersModelObject;
        }
        else
        {
            response.json({"status": false, "code": 500, "message": "User Account Not Found For Given User Account ID", "data": ""});
        }
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "User Account ID is Required", "data": ""});
    }

    if (!(request.body.attendeeUserType == null || request.body.attendeeUserType == ""))
    {
        AttendanceModelObject.attendeeUserType = request.body.attendeeUserType;

        if (!(request.body.attendeeProfileID == null || request.body.attendeeProfileID == ""))
        {
            switch (AttendanceModelObject.attendeeUserType)
            {
                case "Employee":
                    EmployeeModelObject = await Employee.findById(request.body.attendeeProfileID);
                    if (!(EmployeeModelObject == null || EmployeeModelObject == ""))
                    {
                        AttendanceModelObject.attendeeProfile = EmployeeModelObject;
                    }
                    else
                    {
                        response.json({"status": false, "code": 500, "message": "Attendee's Profile is Not Found for Given Attendee's Profile ID", "data": ""});
                    }
                    break;

                case "Student":
                    StudentModelObject = await Student.findById(request.body.attendeeProfileID);
                    if (!(StudentModelObject == null || StudentModelObject == ""))
                    {
                        AttendanceModelObject.attendeeProfile = StudentModelObject;
                    }
                    else
                    {
                        response.json({"status": false, "code": 500, "message": "Attendee's Profile is Not Found for Given Attendee's Profile ID", "data": ""});
                    }
                    break;

                default:
                    response.json({"status": false, "code": 500, "message": "Attendee's User Type is Not Valid", "data": ""});
                    break;
            }
        }
        else
        {
            response.json({"status": false, "code": 500, "message": "Attendee's Profile ID is Required", "data": ""});
        }
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "Attendee's User Type is Required", "data": ""});
    }

    AttendanceModelObject.attendanceDateAndTime = new Date();

    // IF SESSION ==>> ADMIN
    if (!(request.body.attendanceDateAndTime == null || request.body.attendanceDateAndTime == ""))
    {
        if (!(isNaN(Date.parse(request.body.attendanceDateAndTime))))
        {
            request.body.attendanceDateAndTime = new Date(request.body.attendanceDateAndTime);
            AttendanceModelObject.attendanceDateAndTime = request.body.attendanceDateAndTime;
        }
    }

    // IF SESSION ==>> ADMIN
    if (!(request.body.attendeeIpAddress == null || request.body.attendeeIpAddress == ""))
    {
        AttendanceModelObject.attendeeIpAddress = request.body.attendeeIpAddress;
    }
    else
    {
        const attendeeIpAddress = request.clientIp;
        AttendanceModelObject.attendeeIpAddress = attendeeIpAddress;
    }

    // IF SESSION ==>> ADMIN
    if (!(request.body.attendeeGpsLocation == null || request.body.attendeeGpsLocation == ""))
    {
        AttendanceModelObject.attendeeGpsLocation = request.body.attendeeGpsLocation;
    }

    if (await AttendanceModelObject.save())
    {
        await Attendance
            .findOne(AttendanceModelObject._id)
            .populate("attendeeUser")
            .populate("attendeeProfile")
            .then( (responseData) => 
            {
                response.json({"status": true, "code": 200, "message": "Attendance Date Inserted Successfully", "data": responseData});
            })
            .catch( (Error) => 
            {
                response.json({"status": false, "code": 500, "message": "Unable to Get Data in Response", "data": ""});
            });
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "Unable to Insert Attendance Date", "data": ""});
    }
}

const UpdateAttendance = async (request, response) => 
{
    // ACCEPTING FOLLOWING VARIABLES EXCEPT ATTENDANCE_ID
    // { userAccountID, attendeeUserType, attendeeProfileID, attendanceDateAndTime, attendeeIpAddress }

    if (!(request.params.id == null || request.params.id == ""))
    {
        var AttendanceModelObject = await Attendance.findById(request.params.id);

        if (!(request.params.id == null || request.params.id == ""))
        {
            var AttendanceModelObject = new Attendance();
            var UsersModelObject, EmployeeModelObject, StudentModelObject;
    
            if (!(request.body.userAccountID == null || request.body.userAccountID == ""))
            {
                UsersModelObject = await Users.findById(request.body.userAccountID);
    
                if (!(UsersModelObject == null || UsersModelObject == ""))
                {
                    AttendanceModelObject.attendeeUser = UsersModelObject;
                }
                else
                {
                    response.json({"status": false, "code": 500, "message": "User Account Not Found For Given User Account ID", "data": ""});
                }
            }
            else
            {
                response.json({"status": false, "code": 500, "message": "User Account ID is Required", "data": ""});
            }
    
            if (!(request.body.attendeeUserType == null || request.body.attendeeUserType == ""))
            {
                AttendanceModelObject.attendeeUserType = request.body.attendeeUserType;
    
                if (!(request.body.attendeeProfileID == null || request.body.attendeeProfileID == ""))
                {
                    switch (AttendanceModelObject.attendeeUserType)
                    {
                        case "Employee":
                            EmployeeModelObject = await Employee.findById(request.body.attendeeProfileID);
                            if (!(EmployeeModelObject == null || EmployeeModelObject == ""))
                            {
                                AttendanceModelObject.attendeeProfile = EmployeeModelObject;
                            }
                            else
                            {
                                response.json({"status": false, "code": 500, "message": "Attendee's Profile is Not Found for Given Attendee's Profile ID", "data": ""});
                            }
                            break;
    
                        case "Student":
                            StudentModelObject = await Student.findById(request.body.attendeeProfileID);
                            if (!(StudentModelObject == null || StudentModelObject == ""))
                            {
                                AttendanceModelObject.attendeeProfile = StudentModelObject;
                            }
                            else
                            {
                                response.json({"status": false, "code": 500, "message": "Attendee's Profile is Not Found for Given Attendee's Profile ID", "data": ""});
                            }
                            break;
    
                        default:
                            response.json({"status": false, "code": 500, "message": "Attendee's User Type is Not Valid", "data": ""});
                            break;
                    }
                }
                else
                {
                    response.json({"status": false, "code": 500, "message": "Attendee's Profile ID is Required", "data": ""});
                }
            }
            else
            {
                response.json({"status": false, "code": 500, "message": "Attendee's User Type is Required", "data": ""});
            }
    
            AttendanceModelObject.attendanceDateAndTime = new Date();
    
            // IF SESSION ==>> ADMIN
            if (!(request.body.attendanceDateAndTime == null || request.body.attendanceDateAndTime == ""))
            {
                if (!(isNaN(Date.parse(request.body.attendanceDateAndTime))))
                {
                    request.body.attendanceDateAndTime = new Date(request.body.attendanceDateAndTime);
                    AttendanceModelObject.attendanceDateAndTime = request.body.attendanceDateAndTime;
                }
            }

            // IF SESSION ==>> ADMIN
            if (!(request.body.attendeeIpAddress == null || request.body.attendeeIpAddress == ""))
            {
                AttendanceModelObject.attendeeIpAddress = request.body.attendeeIpAddress;
            }
            else
            {
                const attendeeIpAddress = request.clientIp;
                AttendanceModelObject.attendeeIpAddress = attendeeIpAddress;
            }

            // IF SESSION ==>> ADMIN
            if (!(request.body.attendeeGpsLocation == null || request.body.attendeeGpsLocation == ""))
            {
                AttendanceModelObject.attendeeGpsLocation = request.body.attendeeGpsLocation;
            }
    
            if (await AttendanceModelObject.save())
            {
                await Attendance
                        .findOne(AttendanceModelObject._id)
                        .populate("attendeeUser")
                        .populate("attendeeProfile")
                        .then( (responseData) => 
                        {
                            response.json({"status": true, "code": 200, "message": "Attendance Date Updated Successfully", "data": responseData});
                        })
                        .catch( (Error) => 
                        {
                            response.json({"status": false, "code": 500, "message": "Unable to Get Data in Response", "data": ""});
                        });
            }
            else
            {
                response.json({"status": false, "code": 500, "message": "Unable to Insert Attendance Date", "data": ""});
            }
        }
        else
        {
            response.json({"status": false, "code": 500, "message": "No Attendance Record Found For Given ID", "data": ""});
        }
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "Attendance ID is Required to Update Specific Record", "data": ""});
    }
}

const DeleteAttendance = async (request, response) =>
{
    if (!(request.params.id == null || request.params.id == ""))
    {
        Attendance.findByIdAndDelete(request.params.id, (error, success)=>{
            if (error)
            {
                response.json({"status": true, "code": 500, "message": "Unable to DeleteAttendance Record"+error, "data": ""});
            }
            else
            {
                response.json({"status": true, "code": 200, "message": "Attendance Record Deleted Successfully", "data": "Record Deleted Successfully"});
            }
        })
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "Attendance ID is Required to Delete Specific Record", "data": ""});
    }
}

const ViewAttendanceAll = async (request, response) =>
{
    var AttendanceModelObject = await Attendance.find();

    if (!(AttendanceModelObject == null || AttendanceModelObject == ""))
    {
        response.json({"status": true, "code": 200, "message": "Attendance Record Fetched Successfully", "data": AttendanceModelObject});
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "No Record Found For Attendace", "data": ""});
    }
}

const ViewAttendanceOne = async (request, response) =>
{
    if (!(request.params.id == null || request.params.id == ""))
    {
        var AttendanceModelObject = await Attendance.findById(request.params.id);

        if (!(AttendanceModelObject == null || AttendanceModelObject == ""))
        {
            response.json({"status": true, "code": 200, "message": "Attendance Record Fetched Successfully", "data": AttendanceModelObject});
        }
        else
        {
            response.json({"status": false, "code": 500, "message": "No Record Found For Given Attendace ID", "data": ""});
        }
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "Attendance ID is Required to Get Specific Record", "data": ""});
    }
}

module.exports = {
    InsertAttendance, UpdateAttendance, DeleteAttendance, ViewAttendanceAll, ViewAttendanceOne
};