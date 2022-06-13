const { Employee } = require("../Models/EmployeeModel");

const EmployeeDashboard = async (request, response) => 
{
    var EmployeeModelObject = Employee.find();

    if (!(EmployeeModelObject == null || EmployeeModelObject == ""))
    {
        response.json({"status": true, "code": 200, "message": "Employee Record Fetched Successfully", "data": EmployeeModelObject});
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "No Record Found For Attendace", "data": ""});
    }
}

const GetEmployeeAll = async (request, response) =>
{
    var EmployeeModelObject = await Employee.find();

    if (!(EmployeeModelObject == null || EmployeeModelObject == ""))
    {
        response.json({"status": true, "code": 200, "message": "Employee Record Fetched Successfully", "data": EmployeeModelObject});
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "No Record Found For Employees", "data": ""});
    }
}

const GetEmployeeOne = async (request, response) =>
{
    if (!(request.params.id == null || request.params.id == ""))
    {
        var EmployeeModelObject = await Employee.findById(request.params.id);

        if (!(EmployeeModelObject == null || EmployeeModelObject == ""))
        {
            response.json({"status": true, "code": 200, "message": "Employee Record Fetched Successfully", "data": EmployeeModelObject});
        }
        else
        {
            response.json({"status": false, "code": 500, "message": "No Record Found For Given Employee ID", "data": ""});
        }
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "Employee ID is Required to Get Specific Record", "data": ""});
    }
}

module.exports = {
    EmployeeDashboard, GetEmployeeAll, GetEmployeeOne
};