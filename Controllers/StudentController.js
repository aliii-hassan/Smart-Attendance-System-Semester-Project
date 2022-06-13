const { Student } = require("../Models/StudentModel");

const StudentDashboard = async (request, response) => 
{
    response.render("./StudentDashboard");
}

const GetStudentAll = async (request, response) =>
{
    var StudentModelObject = await Student.find();

    if (!(StudentModelObject == null || StudentModelObject == ""))
    {
        response.json({"status": true, "code": 200, "message": "Student Record Fetched Successfully", "data": StudentModelObject});
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "No Record Found For Students", "data": ""});
    }
}

const GetStudentOne = async (request, response) =>
{
    if (!(request.params.id == null || request.params.id == ""))
    {
        var StudentModelObject = await Student.findById(request.params.id);

        if (!(StudentModelObject == null || StudentModelObject == ""))
        {
            response.json({"status": true, "code": 200, "message": "Student Record Fetched Successfully", "data": StudentModelObject});
        }
        else
        {
            response.json({"status": false, "code": 500, "message": "No Record Found For Given Student ID", "data": ""});
        }
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "Student ID is Required to Get Specific Record", "data": ""});
    }
}

module.exports = {
    StudentDashboard, GetStudentAll, GetStudentOne
};