const bcrypt = require("bcryptjs");

const { Users } = require("../Models/UsersModel");
const { City } = require("../Models/CityModel");
const { State } = require("../Models/StateModel");
const { Country } = require("../Models/CountryModel");
const { Industries } = require("../Models/IndustriesModel");
const { NumberOfEmployees } = require("../Models/NumberOfEmployeesModel");
const { Admin } = require("../Models/AdminModel");
const { Company } = require("../Models/CompanyModel");
const { Employee } = require("../Models/EmployeeModel");
const { Student } = require("../Models/StudentModel");
const { EmployeePosition } = require("../Models/EmployeePositionModel");

const SignUp = async (request, response) => 
{
    var error = "";
    if (request.params.error)
    {
        error = request.params.error;
    }

    var NumberOfEmployeesData = await NumberOfEmployees.find();
    var IndustriesData = await Industries.find();
    var CompanyData = await Company.find();

    response.render("./SignUpPage", {"CompanyData": CompanyData, "IndustriesData": IndustriesData, "NumberOfEmployeesData": NumberOfEmployeesData, "error": error});
}

const RegisterNewUser = async (request, response) => 
{
    var ExistingUser = await Users.findOne({ emailAddress: request.body['email-address'] });
    if (!(ExistingUser == null || ExistingUser == ""))
    {
        response.status(500).redirect(request.originalUrl + "/Email Already Exist");
    }
    else
    {
        var Salt = await bcrypt.genSalt(10);

        var InputData = request.body;

        var UsersModelObject = new Users();

        var CityObject = await City.findById(InputData['city']);
        var StateObject = await State.findById(InputData['state']);
        var CountryObject = await Country.findById(InputData['country']);

        if (!(InputData['street-address'] == null || InputData['street-address'] == ""))
        {
            UsersModelObject.streetAddress = InputData['street-address'];
        }

        if (!(CityObject == null || CityObject == ""))
        {
            UsersModelObject.city = CityObject;
        }

        if (!(StateObject == null || StateObject == ""))
        {
            UsersModelObject.state = StateObject;
        }

        if (!(CountryObject == null || CountryObject == ""))
        {
            UsersModelObject.country = CountryObject;
        }

        if (!(InputData['email-address'] == null || InputData['email-address'] == ""))
        {
            if (EmailAddressValidation(InputData['email-address']))
            {
                UsersModelObject.emailAddress = InputData['email-address'];
            }
            else
            {
                response.status(500).redirect(request.originalUrl + "/Email Address is Not Valid");
            }
        }
        else
        {
            response.status(500).redirect(request.originalUrl + "/Email Address is Required");
        }

        if (!(InputData['password'] == null || InputData['password'] == ""))
        {
            if (PasswordPatternValidation(InputData['password']))
            {
                UsersModelObject.password = InputData['password'];
                UsersModelObject.password = await bcrypt.hash(UsersModelObject.password, Salt);
            }
            else
            {
                response.status(500).redirect(request.originalUrl + "/Password is Not Valid");
            }
        }
        else
        {
            response.status(500).redirect(request.originalUrl + "/Email Address is Required");
        }

        if (!(InputData['contact-number'] == null || InputData['contact-number'] == ""))
        {
            UsersModelObject.contact = InputData['contact-number'];
        }
        else
        {        
            response.status(500).redirect(request.originalUrl + "/Contact Number is Required");
        }

        if (!(InputData['registration-type'] == null || InputData['registration-type'] == ""))
        {
            UsersModelObject.userType = InputData['registration-type'];
        }
        else
        {
            response.status(500).redirect(request.originalUrl + "/Registration Type is Required");
        }

        await UsersModelObject.save();

        switch (request.body['registration-type'])
        {
            case "Company":
                var CompanyModelObject = new Company();
                if (!(InputData['company-name'] == null || InputData['company-name'] == ""))
                {
                    CompanyModelObject.companyName = InputData['company-name'];
                }
                else
                {
                    response.status(500).redirect(request.originalUrl + "/Company Name is Required");
                }
                var IndustriesModelObject = await Industries.findById(InputData['company-industry-name']);
                if (!(IndustriesModelObject == null || IndustriesModelObject == ""))
                {
                    if (!(InputData['company-industry-name'] == null || InputData['company-industry-name'] == ""))
                    {
                        CompanyModelObject.industry = InputData['company-industry-name'];
                    }
                    else
                    {
                        response.status(500).redirect(request.originalUrl + "/Industry is Required");
                    }
                }
                else
                {
                    response.status(500).redirect(request.originalUrl + "/Industry is Not Valid");
                }
                var NumberOfEmployeesModelObject = await NumberOfEmployees.findById(InputData['company-number-of-employees']);
                if (!(NumberOfEmployeesModelObject == null || NumberOfEmployeesModelObject == ""))
                {
                    if (!(InputData['company-number-of-employees'] == null || InputData['company-number-of-employees'] == ""))
                    {
                        CompanyModelObject.numberOfEmployees = InputData['company-number-of-employees'];
                    }
                    else
                    {
                        response.status(500).redirect(request.originalUrl + "/Number of Employees Required");
                    }
                }
                else
                {
                    response.status(500).redirect(request.originalUrl + "/Number of Employees Not Valid");
                }
                CompanyModelObject.userProfile = UsersModelObject;
                await CompanyModelObject.save();
                response.redirect("/company/dashboard");
                break;

            case "Employee":
                var EmployeeModelObject = new Employee();
                if (!(InputData['first-name'] == null || InputData['first-name'] == ""))
                {
                    EmployeeModelObject.firstName = InputData['first-name'];
                }
                else
                {
                    response.status(500).redirect(request.originalUrl + "/First Name is Required");
                }
                if (!(InputData['last-name'] == null || InputData['last-name'] == ""))
                {
                    EmployeeModelObject.lastName = InputData['last-name'];
                }
                else
                {
                    response.status(500).redirect(request.originalUrl + "/Last Name is Required");
                }
                var CompanyModelObject = await Company.findById(InputData['employee-company-name']);
                if (!(CompanyModelObject == null || CompanyModelObject == ""))
                {
                    if (!(InputData['employee-company-name'] == null || InputData['employee-company-name'] == ""))
                    {
                        EmployeeModelObject.company = InputData['employee-company-name'];
                    }
                    else
                    {
                        response.status(500).redirect(request.originalUrl + "/Company is Required");
                    }
                }
                else
                {
                    response.status(500).redirect(request.originalUrl + "/Company is Not Valid");
                }
                var EmployeePositionModelObject = await EmployeePosition.findById(InputData['employee-position']);
                if (!(EmployeePositionModelObject == null || EmployeePositionModelObject == ""))
                {
                    if (!(InputData['employee-position'] == null || InputData['employee-position'] == ""))
                    {
                        EmployeeModelObject.position = InputData['employee-position'];
                    }
                    else
                    {
                        response.status(500).redirect(request.originalUrl + "/Position is Required");
                    }
                }
                else
                {
                    response.status(500).redirect(request.originalUrl + "/Position is Not Valid");
                }
                EmployeeModelObject.userProfile = UsersModelObject;
                await EmployeeModelObject.save();
                response.redirect("/employee/dashboard");
                break;

            case "Student":
                var StudentModelObject = new Student();
                if (!(InputData['first-name'] == null || InputData['first-name'] == ""))
                {
                    StudentModelObject.firstName = InputData['first-name'];
                }
                else
                {
                    response.status(500).redirect(request.originalUrl + "/First Name is Required");
                }
                if (!(InputData['last-name'] == null || InputData['last-name'] == ""))
                {
                    StudentModelObject.lastName = InputData['last-name'];
                }
                else
                {
                    response.status(500).redirect(request.originalUrl + "/Last Name is Required");
                }
                StudentModelObject.userProfile = UsersModelObject;
                await StudentModelObject.save();
                response.redirect("/student/dashboard");
                break;

            case "Admin":
                var AdminModelObject = new Admin();
                if (!(InputData['first-name'] == null || InputData['first-name'] == ""))
                {
                    AdminModelObject.firstName = InputData['first-name'];
                }
                else
                {
                    response.status(500).redirect(request.originalUrl + "/First Name is Required");
                }
                if (!(InputData['last-name'] == null || InputData['last-name'] == ""))
                {
                    AdminModelObject.lastName = InputData['last-name'];
                }
                else
                {
                    response.status(500).redirect(request.originalUrl + "/Last Name is Required");
                }
                AdminModelObject.userProfile = UsersModelObject;
                await AdminModelObject.save();
                response.redirect("/admin/dashboard");
                break;

            default:
                response.status(500).redirect(request.originalUrl + "/Unexpected Error Occured");
                break;
        }
    }
}

const SignIn = async (request, response) => 
{
    var error = "";
    if (request.params.error)
    {
        error = request.params.error;
    }

    response.render("./SignInPage", {"error": error});
}

const LoginUser = async (request, response, next) => 
{
    var CurrentUser = await Users.findOne({ emailAddress: request.body['email-address'] });
    if (!(CurrentUser == null || CurrentUser == ""))
    {
        if (!(await bcrypt.compare(request.body.password, CurrentUser.password)))
        {
            response.status(500).redirect(request.originalUrl + "/Password is Not Correct");        
        }
        else
        {
            request.session.activeUser = CurrentUser;
            
            switch (CurrentUser.userType)
            {
                case "Company":
                    response.redirect("/company/dashboard");
                    break;
                
                case "Employee":
                    response.redirect("/employee/dashboard");
                    break;
                
                case "Student":
                    response.redirect("/student/dashboard");
                    break;
                
                case "Admin":
                    response.redirect("/admin/dashboard");
                    break;
                
                default:
                    response.status(500).redirect(request.originalUrl + "/Unexpected Error Occured");
                    break;
            }
        }
    }
    else
    {
        response.status(500).redirect(request.originalUrl + "/User Not Found For Given Email Address");
    }
}

const LogoutUser = async  (request, response) =>
{
    request.session.activeUser = null;

    return response.redirect("/");
}

const PasswordReset = async (request, response) => 
{
    var error = "";
    if (request.params.error)
    {
        error = request.params.error;
    }

    response.render("./PasswordResetPage", {"error": error});
}

const PasswordRecovered = async (request, response) => 
{
    var Salt = await bcrypt.genSalt(10);

    var UsersModelObject = await Users.findOne({ emailAddress: request.body['email-address'] });
    if (!(UsersModelObject == null || UsersModelObject == ""))
    {
        if (PasswordPatternValidation(request.body['password']))
        {
            UsersModelObject.password = request.body['password'];
            UsersModelObject.password = await bcrypt.hash(UsersModelObject.password, Salt);

            response.redirect('/signin');
        }
        else
        {
            response.status(500).redirect(request.originalUrl + "/Password is Not Valid");
        }
    }
    else
    {
        response.status(500).redirect(request.originalUrl + "/User Not Found For Given Email Address");
    }
}

const GetUsersAll = async (request, response) =>
{
    var UsersModelObject = await Users.find();

    if (!(UsersModelObject == null || UsersModelObject == ""))
    {
        response.json({"status": true, "code": 200, "message": "Users Record Fetched Successfully", "data": UsersModelObject});
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "No Record Found For Users", "data": ""});
    }
}

const GetUsersOne = async (request, response) =>
{
    if (!(request.params.id == null || request.params.id == ""))
    {
        var UsersModelObject = await Users.findById(request.params.id);

        if (!(UsersModelObject == null || UsersModelObject == ""))
        {
            response.json({"status": true, "code": 200, "message": "Users Record Fetched Successfully", "data": UsersModelObject});
        }
        else
        {
            response.json({"status": false, "code": 500, "message": "No Record Found For Given User ID", "data": ""});
        }
    }
    else
    {
        response.json({"status": false, "code": 500, "message": "Users ID is Required to Get Specific Record", "data": ""});
    }
}

function EmailAddressValidation(Email) 
{
    var emailValidatePattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailValidatePattern.test(Email);
}

function PasswordPatternValidation(Password) 
{
    var passwordValidatePattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return passwordValidatePattern.test(Password);
}

module.exports = {
    SignUp, RegisterNewUser, SignIn, LoginUser, PasswordReset, PasswordRecovered, GetUsersAll, GetUsersOne, LogoutUser
};