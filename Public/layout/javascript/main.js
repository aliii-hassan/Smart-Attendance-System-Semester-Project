// Page Bindings (This will Execute after Page Load)
$(function ()
{
    // Enable Select2 (Search Option in Select Tag)
    EnableSelect2();

    // Enable International Telephone Input
    EnableInternationalTelephoneInput();

    // Set Current Page URL On Pages Having Forms
    $("input[name='current-page-url']").val();

    // Site Home Page Animations, Modal-Popup
    $(window).on("scroll", SiteIntroductionAnimatedView);
    $(window).on("scroll", SiteClientsAnimatedView);
    $("#home-page-login-popup-button").click(ShowHomePageLoginPopup);
    setTimeout(function (){ $("#home-page-login-popup-button").click(); }, 7000);
    $("#home-page-login-popup-close-button").click(CloseHomePageLoginPopup);
    
    // Hide Registration Forms At Page Load
    HideRegistrationFormsAtPageLoad();

    // Show/Hide Registration Forms on the basis of Checked Value
    $("input[name='registration-type']").change(SignUpFormComponentsShowHide);

    // Registration Forms Validation
    $("#company-name").on("blur input", { InputFieldName: "company-name" }, CheckFormsValidity);
    $("#company-industry-name").on("change", { InputFieldName: "company-industry-name" }, CheckFormsValidity);
    $("#company-number-of-employees").on("change", { InputFieldName: "company-number-of-employees" }, CheckFormsValidity);
    $("input[id$='email-address']").on("blur input", { InputFieldName: "email-address" }, CheckFormsValidity);
    $("input[id$='password']").on("blur input", { InputFieldName: "password" }, CheckFormsValidity);
    $("input[id$='contact-number']").on("blur input", { InputFieldName: "contact-number" }, CheckFormsValidity);
    $("input[id$='first-name']").on("blur input", { InputFieldName: "first-name" }, CheckFormsValidity);
    $("input[id$='last-name']").on("blur input", { InputFieldName: "last-name" }, CheckFormsValidity);
    $("#employee-company-name").on("change", { InputFieldName: "employee-company-name" }, CheckFormsValidity);
    $("#employee-position").on("change", { InputFieldName: "employee-position" }, CheckFormsValidity);

    // Handle Forms Submission
    $('#signin-form').submit(SigninFormSubmission);
    $('#signup-form').submit(SignupFormSubmission);
    $('#password-reset-form').submit(PasswordResetFormSubmission);

    // Set Rules for Validation before Submission
    $("form[id$='form']").validate({
        rules: 
        {
            "company-name": "required",
            "company-industry-name": "required",
            "company-number-of-employees": "required",
            "email-address":
            {
                required: true,
                email: true,
            },
            "password":
            {
                required: true,
                minlength : 8,
            },
            "contact-number":
            {
                required: true,
                minlength: 11,
            },
            "first-name": "required",
            "last-name": "required",
            "employee-company-name": "required",
            "employee-position": "required",

            messages: 
            {
                "company-name": "",
                "company-industry-name": "",
                "company-number-of-employees": "",
                "email-address": "",
                "password": "",
                "contact-number": "",
                "first-name": "",
                "last-name": "",
                "employee-company-name": "",
                "employee-position": "",
            }
        }
      });
});

function EnableSelect2()
{
    $(".select2").select2();
}

function EnableInternationalTelephoneInput()
{
    $("input[id$='contact-number']").intlTelInput({
        allowDropdown:true,
        autoHideDialCode:true,
        autoPlaceholder:"polite",
    });
}

function HideRegistrationFormsAtPageLoad()
{
    $("#company-form-div").hide();
    $("#employee-form-div").hide();
    $("#student-form-div").hide();
}

function SiteIntroductionAnimatedView()
{
    var SiteIntroduction = $('.description-site-introduction').toArray();

    SiteIntroduction.forEach(function(SiteIntroBody)
    {
        var WindowHeight = $(window).innerHeight();
        var RevealTopPoint = SiteIntroBody.getBoundingClientRect().top;
        var RevealBottomPoint = SiteIntroBody.getBoundingClientRect().bottom;
        var RevealPoint = 0;

        if (RevealTopPoint < (WindowHeight - RevealPoint) && RevealBottomPoint >= 0)
        {
            SiteIntroBody.classList.add('active');
        }
        else
        {
            SiteIntroBody.classList.remove('active');
        }
    });
}

function SiteClientsAnimatedView()
{
    var SiteClients = $('.fade-up-animator').toArray();

    SiteClients.forEach(function(SiteIntroBody)
    {
        var WindowHeight = $(window).innerHeight();
        var RevealTopPoint = SiteIntroBody.getBoundingClientRect().top;
        var RevealBottomPoint = SiteIntroBody.getBoundingClientRect().bottom;
        var RevealPoint = 0;

        if (RevealTopPoint < (WindowHeight - RevealPoint) && RevealBottomPoint >= 0)
        {
            SiteIntroBody.classList.add('active');
        }
        else
        {
            SiteIntroBody.classList.remove('active');
        }
    });
}

function ShowHomePageLoginPopup()
{
    $('#LoginPopupModal').modal('show');
}


function CloseHomePageLoginPopup()
{
    $('#LoginPopupModal').modal('hide');
}

function SignUpFormComponentsShowHide()
{
    var RegistrationType = $("input[name='registration-type']:checked").val();
    var RegistrationTypeSpan = $("#registration-type-span");
    var CompanyFormDiv = $("#company-form-div");
    var EmployeeFormDiv = $("#employee-form-div");
    var StudentFormDiv = $("#student-form-div");

    CompanyFormDiv.hide();
    EmployeeFormDiv.hide();
    StudentFormDiv.hide();

    switch (RegistrationType)
    {
        case "Company":
            RegistrationTypeSpan.hide();
            CompanyFormDiv.show();
            break;

        case "Employee":
            RegistrationTypeSpan.hide();
            EmployeeFormDiv.show();
            break;

        case "Student":
            RegistrationTypeSpan.hide();
            StudentFormDiv.show();
            break;

        case "Admin":
            RegistrationTypeSpan.hide();
            StudentFormDiv.show();
            break;

        default:
            RegistrationTypeSpan.show();
            RegistrationTypeSpan.html("<sup>Please Select Registration Type</sup>");
            break;
    }
}

function CheckFormsValidity(event)
{
    switch (event.data.InputFieldName)
    {
        case "company-name":
            var CompanyName = $("#company-name").val();
            if (CompanyName == null || CompanyName == "")
            {
                $("#company-name-span").show();
                $("#company-name-span").html("<sup>Company Name is Required</sup>");
            }
            else
            {
                $("#company-name-span").hide();
            }
            break;

        case "company-industry-name":
            var CompanyIndustryName = $("#company-industry-name").val();
            if (CompanyIndustryName == null || CompanyIndustryName == "")
            {
                $("#company-industry-name-span").show();
                $("#company-industry-name-span").html("<sup>Industry is Required</sup>");
            }
            else
            {
                $("#company-industry-name-span").hide();
            }
            break;

        case "company-number-of-employees":
            var CompanyNumberOfEmployees = $("#company-number-of-employees").val();
            if (CompanyNumberOfEmployees == null || CompanyNumberOfEmployees == "")
            {
                $("#company-number-of-employees-span").show();
                $("#company-number-of-employees-span").html("<sup>Number of Employees Required</sup>");
            }
            else
            {
                $("#company-number-of-employees-span").hide();
            }
            break;

        case "employee-company-name":
            var EmployeeCompanyName = $("#employee-company-name").val();
            if (EmployeeCompanyName == null || EmployeeCompanyName == "")
            {
                $("#employee-company-name-span").show();
                $("#employee-company-name-span").html("<sup>Company is Required</sup>");
            }
            else
            {
                $("#employee-company-name-span").hide();
            }
            break;

        case "employee-position":
            var EmployeePosition = $("#employee-position").val();
            if (EmployeePosition == null || EmployeePosition == "")
            {
                $("#employee-position-span").show();
                $("#employee-position-span").html("<sup>Position is Required</sup>");
            }
            else
            {
                $("#employee-position-span").hide();
            }
            break;

        case "email-address":
            var RegistrationType = $("input[name='registration-type']:checked").val();
            switch (RegistrationType)
            {
                case "Company":
                    var EmailAddressPrefix = "company-";
                    break;

                case "Employee":
                    var EmailAddressPrefix = "employee-";
                    break;

                case "Student":
                    var EmailAddressPrefix = "student-";
                    break;

                default:
                    if (event.currentTarget.id == "password-reset-email-address")
                    {
                        var EmailAddressPrefix = "password-reset-";
                    }
                    else
                    {
                        var EmailAddressPrefix = "";
                    }
                    break;
            }
            var EmailAddress = $("#"+EmailAddressPrefix+"email-address").val();
            if (EmailAddress == null || EmailAddress == "")
            {
                $("#"+EmailAddressPrefix+"email-address-span").show();
                $("#"+EmailAddressPrefix+"email-address-span").removeClass('text-success');
                $("#"+EmailAddressPrefix+"email-address-span").addClass('text-danger');
                $("#"+EmailAddressPrefix+"email-address-span").html("<sup>Email Address is Required</sup>");
            }
            else
            {
                if (!(EmailValidation(EmailAddress)))
                {
                    $("#"+EmailAddressPrefix+"email-address-span").show();
                    $("#"+EmailAddressPrefix+"email-address-span").removeClass('text-success');
                    $("#"+EmailAddressPrefix+"email-address-span").addClass('text-danger');
                    $("#"+EmailAddressPrefix+"email-address-span").html("<sup>Invalid Email Address</sup>");
                }
                else
                {
                    $("#"+EmailAddressPrefix+"email-address-span").show();
                    $("#"+EmailAddressPrefix+"email-address-span").removeClass('text-danger');
                    $("#"+EmailAddressPrefix+"email-address-span").addClass('text-success');
                    $("#"+EmailAddressPrefix+"email-address-span").html("<sup>&#x2705; Email Address is Valid</sup>");
                    setTimeout(function (){ $("#"+EmailAddressPrefix+"email-address-span").fadeOut(1000); }, 7000);
                }
            }
            break;

        case "password":
            var RegistrationType = $("input[name='registration-type']:checked").val();
            switch (RegistrationType)
            {
                case "Company":
                    var PasswordPrefix = "company-";
                    break;

                case "Employee":
                    var PasswordPrefix = "employee-";
                    break;

                case "Student":
                    var PasswordPrefix = "student-";
                    break;

                default:
                    if (event.currentTarget.id == "password-reset-password")
                    {
                        var PasswordPrefix = "password-reset-";
                    }
                    else
                    {
                        var PasswordPrefix = "";
                    }
                    break;
            }
            var Password = $("#"+PasswordPrefix+"password").val();
            if (Password == null || Password == "")
            {
                $("#"+PasswordPrefix+"password-span").show();
                $("#"+PasswordPrefix+"password-span").removeClass('text-success');
                $("#"+PasswordPrefix+"password-span").addClass('text-danger');
                $("#"+PasswordPrefix+"password-span").html("<sup>Password is Required</sup>");
            }
            else
            {
                switch (PasswordValidation(Password))
                {
                    case "Valid":
                        $("#"+PasswordPrefix+"password-span").show();
                        $("#"+PasswordPrefix+"password-span").removeClass('text-danger');
                        $("#"+PasswordPrefix+"password-span").addClass('text-success');
                        $("#"+PasswordPrefix+"password-span").html("<sup>&#x2705; Password is Valid</sup>");
                        setTimeout(function (){ $("#"+PasswordPrefix+"password-span").fadeOut(1000); }, 7000);
                        break;
                    case "Eight Characters":
                        $("#"+PasswordPrefix+"password-span").show();
                        $("#"+PasswordPrefix+"password-span").removeClass('text-success');
                        $("#"+PasswordPrefix+"password-span").addClass('text-danger');
                        $("#"+PasswordPrefix+"password-span").html("<sup>Password should have atleast eight characters</sup>");
                        break
                    case "Uppercase":
                        $("#"+PasswordPrefix+"password-span").show();
                        $("#"+PasswordPrefix+"password-span").removeClass('text-success');
                        $("#"+PasswordPrefix+"password-span").addClass('text-danger');
                        $("#"+PasswordPrefix+"password-span").html("<sup>Password should have atleast one uppercase character</sup>");
                        break
                    case "Lowercase":
                        $("#"+PasswordPrefix+"password-span").show();
                        $("#"+PasswordPrefix+"password-span").removeClass('text-success');
                        $("#"+PasswordPrefix+"password-span").addClass('text-danger');
                        $("#"+PasswordPrefix+"password-span").html("<sup>Password should have atleast one lowercase character</sup>");
                        break
                    case "One Digit":
                        $("#"+PasswordPrefix+"password-span").show();
                        $("#"+PasswordPrefix+"password-span").removeClass('text-success');
                        $("#"+PasswordPrefix+"password-span").addClass('text-danger');
                        $("#"+PasswordPrefix+"password-span").html("<sup>Password should have atleast one digit</sup>");
                        break
                    case "Special Character":
                        $("#"+PasswordPrefix+"password-span").show();
                        $("#"+PasswordPrefix+"password-span").removeClass('text-success');
                        $("#"+PasswordPrefix+"password-span").addClass('text-danger');
                        $("#"+PasswordPrefix+"password-span").html("<sup>Password should have atleast one special character</sup>");
                        break
                    default:
                        break;
                }
            }
            break;

        case "contact-number":
            var RegistrationType = $("input[name='registration-type']:checked").val();
            switch (RegistrationType)
            {
                case "Company":
                    var ContactNumberPrefix = "company-";
                    break;

                case "Employee":
                    var ContactNumberPrefix = "employee-";
                    break;

                case "Student":
                    var ContactNumberPrefix = "student-";
                    break;

                default:
                    break;
            }
            var ContactNumber = $("#"+ContactNumberPrefix+"contact-number").val();
            if (ContactNumber == null || ContactNumber == "")
            {
                $("#"+ContactNumberPrefix+"contact-number-span").show();
                $("#"+ContactNumberPrefix+"contact-number-span").html("<sup>Contact Number is Required</sup>");
            }
            else
            {
                $("#"+ContactNumberPrefix+"contact-number-span").hide();
            }
            break;

        case "first-name":
            var RegistrationType = $("input[name='registration-type']:checked").val();
            switch (RegistrationType)
            {
                case "Employee":
                    var FirstNamePrefix = "employee-";
                    break;

                case "Student":
                    var FirstNamePrefix = "student-";
                    break;

                default:
                    break;
            }
            var FirstName = $("#"+FirstNamePrefix+"first-name").val();
            if (FirstName == null || FirstName == "")
            {
                $("#"+FirstNamePrefix+"first-name-span").show();
                $("#"+FirstNamePrefix+"first-name-span").html("<sup>First Name is Required</sup>");
            }
            else
            {
                $("#"+FirstNamePrefix+"first-name-span").hide();
            }
            break;

        case "last-name":
            var RegistrationType = $("input[name='registration-type']:checked").val();
            switch (RegistrationType)
            {
                case "Employee":
                    var LastNamePrefix = "employee-";
                    break;

                case "Student":
                    var LastNamePrefix = "student-";
                    break;

                default:
                    break;
            }
            var LastName = $("#"+LastNamePrefix+"last-name").val();
            if (LastName == null || LastName == "")
            {
                $("#"+LastNamePrefix+"last-name-span").show();
                $("#"+LastNamePrefix+"last-name-span").html("<sup>First Name is Required</sup>");
            }
            else
            {
                $("#"+LastNamePrefix+"last-name-span").hide();
            }
            break;

        default:
            break;

    }
}

function EmailValidation(Email) 
{
    var emailValidatePattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailValidatePattern.test(Email);
}

function PasswordValidation(Password) 
{
    var passwordValidatePattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!(passwordValidatePattern.test(Password)))
    {
        var atleastOneUppercaseCharacters = /^.*[A-Z].*$/;
        var atleastOneLowercaseCharacters = /^.*[a-z].*$/;
        var atleastOneDigit = /^.*[0-9].*$/;
        var atleastOneSpecialCharacter = /^.*[#?!@$%^&*-].*$/;

        if (!(atleastOneUppercaseCharacters.test(Password)))
        {
            return "Uppercase";
        }

        if (!(atleastOneLowercaseCharacters.test(Password)))
        {
            return "Lowercase";
        }

        if (!(atleastOneDigit.test(Password)))
        {
            return "One Digit";
        }

        if (!(atleastOneSpecialCharacter.test(Password)))
        {
            return "Special Character";
        }

        return "Eight Characters";

    }
    else
    {
        return "Valid";
    }
}

function SigninFormSubmission(event)
{
    if ((PasswordValidation($("input[name='password']").val()) != "Valid") || (!(EmailValidation($("input[name='email-address']").val()))))
    {
        event.preventDefault();
    }

    $('#signin-form').validate();
}

function SignupFormSubmission(event)
{
    var RegistrationType = $("input[name='registration-type']:checked").val();

    switch (RegistrationType)
    {
        case "Company":
            $("div#employee-form-div").remove();
            $("div#student-form-div").remove();
            break;

        case "Employee":
            $("div#company-form-div").remove();
            $("div#student-form-div").remove();
            break;

        case "Student":
            $("div#company-form-div").remove();
            $("div#employee-form-div").remove();
            break;

        case "Admin":
            $("div#company-form-div").remove();
            $("div#employee-form-div").remove();
            break;

        default:
            break;
    }
    
    if ((PasswordValidation($("input[name='password']").val()) != "Valid") || (!(EmailValidation($("input[name='email-address']").val()))))
    {
        event.preventDefault();
    }

    $('#signup-form').validate();
}

function PasswordResetFormSubmission(event)
{
    if ((PasswordValidation($("input[name='password']").val()) != "Valid") || (!(EmailValidation($("input[name='email-address']").val()))))
    {
        event.preventDefault();
    }

    $('#password-reset-form').validate();
}