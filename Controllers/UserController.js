const bcrypt = require("bcryptjs");

const { Users } = require("../Models/UsersModel");
const { City } = require("../Models/CityModel");
const { State } = require("../Models/StateModel");
const { Country } = require("../Models/CountryModel");
const { Industries } = require("../Models/IndustriesModel");
const { NumberOfEmployees } = require("../Models/NumberOfEmployeesModel");
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

        var UsersModel = new Users();

        var CityObject = await City.findById(InputData['city']);
        var StateObject = await State.findById(InputData['state']);
        var CountryObject = await Country.findById(InputData['country']);

        if (!(InputData['street-address'] == null || InputData['street-address'] == ""))
        {
            UsersModel.streetAddress = InputData['street-address'];
        }

        if (!(CityObject == null || CityObject == ""))
        {
            UsersModel.city = CityObject;
        }

        if (!(StateObject == null || StateObject == ""))
        {
            UsersModel.state = StateObject;
        }

        if (!(CountryObject == null || CountryObject == ""))
        {
            UsersModel.country = CountryObject;
        }

        if (!(InputData['email-address'] == null || InputData['email-address'] == ""))
        {
            if (EmailAddressValidation(InputData['email-address']))
            {
                UsersModel.emailAddress = InputData['email-address'];
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
                UsersModel.password = InputData['password'];
                UsersModel.password = await bcrypt.hash(UsersModel.password, Salt);
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
            UsersModel.contact = InputData['contact-number'];
        }
        else
        {        
            response.status(500).redirect(request.originalUrl + "/Contact Number is Required");
        }

        if (!(InputData['registration-type'] == null || InputData['registration-type'] == ""))
        {
            UsersModel.userType = InputData['registration-type'];
        }
        else
        {
            response.status(500).redirect(request.originalUrl + "/Registration Type is Required");
        }

        await UsersModel.save();

        switch (request.body['registration-type'])
        {
            case "Company":
                var CompanyModel = new Company();
                if (!(InputData['company-name'] == null || InputData['company-name'] == ""))
                {
                    CompanyModel.companyName = InputData['company-name'];
                }
                else
                {
                    response.status(500).redirect(request.originalUrl + "/Company Name is Required");
                }
                var IndustriesModel = await Industries.findById(InputData['company-industry-name']);
                if (!(IndustriesModel == null || IndustriesModel == ""))
                {
                    if (!(InputData['company-industry-name'] == null || InputData['company-industry-name'] == ""))
                    {
                        CompanyModel.industry = InputData['company-industry-name'];
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
                var NumberOfEmployeesModel = await NumberOfEmployees.findById(InputData['company-number-of-employees']);
                if (!(NumberOfEmployeesModel == null || NumberOfEmployeesModel == ""))
                {
                    if (!(InputData['company-number-of-employees'] == null || InputData['company-number-of-employees'] == ""))
                    {
                        CompanyModel.numberOfEmployees = InputData['company-number-of-employees'];
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
                await CompanyModel.save();
                response.redirect("/company/dashboard");
                break;

            case "Employee":
                var EmployeeModel = new Employee();
                if (!(InputData['first-name'] == null || InputData['first-name'] == ""))
                {
                    EmployeeModel.firstName = InputData['first-name'];
                }
                else
                {
                    response.status(500).redirect(request.originalUrl + "/First Name is Required");
                }
                if (!(InputData['last-name'] == null || InputData['last-name'] == ""))
                {
                    EmployeeModel.lastName = InputData['last-name'];
                }
                else
                {
                    response.status(500).redirect(request.originalUrl + "/Last Name is Required");
                }
                var CompanyModel = await Company.findById(InputData['employee-company-name']);
                if (!(CompanyModel == null || CompanyModel == ""))
                {
                    if (!(InputData['employee-company-name'] == null || InputData['employee-company-name'] == ""))
                    {
                        EmployeeModel.company = InputData['employee-company-name'];
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
                var EmployeePositionModel = await EmployeePosition.findById(InputData['employee-position']);
                if (!(EmployeePositionModel == null || EmployeePositionModel == ""))
                {
                    if (!(InputData['employee-position'] == null || InputData['employee-position'] == ""))
                    {
                        EmployeeModel.position = InputData['employee-position'];
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
                await EmployeeModel.save();
                response.redirect("/employee/dashboard");
                break;

            case "Student":
                var StudentModel = new Student();
                if (!(InputData['first-name'] == null || InputData['first-name'] == ""))
                {
                    StudentModel.firstName = InputData['first-name'];
                }
                else
                {
                    response.status(500).redirect(request.originalUrl + "/First Name is Required");
                }
                if (!(InputData['last-name'] == null || InputData['last-name'] == ""))
                {
                    StudentModel.lastName = InputData['last-name'];
                }
                else
                {
                    response.status(500).redirect(request.originalUrl + "/Last Name is Required");
                }
                await StudentModel.save();
                response.redirect("/student/dashboard");
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

const LoginUser = async (request, response) => 
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

    var UsersModel = await Users.findOne({ emailAddress: request.body['email-address'] });
    if (!(UsersModel == null || UsersModel == ""))
    {
        if (PasswordPatternValidation(request.body['password']))
        {
            UsersModel.password = request.body['password'];
            UsersModel.password = await bcrypt.hash(UsersModel.password, Salt);

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
    SignUp, RegisterNewUser, SignIn, LoginUser, PasswordReset, PasswordRecovered,
};
