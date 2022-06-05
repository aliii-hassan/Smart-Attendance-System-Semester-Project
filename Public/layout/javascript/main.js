// Page Bindings (This will Execute after Page Load)
$(function ()
{
    // Enable Select2 (Search Option in Select Tag)
    EnableSelect2();

    // Enable International Telephone Input
    $("input[id$='contact-number']").intlTelInput({
        allowDropdown:true,
        autoHideDialCode:true,
        autoPlaceholder:"polite",
    });

    // Hide Registration Forms At Page Load
    $("#company-form-div").hide();
    $("#employee-form-div").hide();
    $("#student-form-div").hide();

    // Show/Hide Registration Forms on the basis of Checked Value
    $("input[name='registration-type']").change(SignUpFormComponentsShowHide);

    // Registration Forms Validation
    $("#company-name").on("blur", { InputFieldName: "company-name" }, CheckCompanyFormValidity);
    $("#company-name").on("input", { InputFieldName: "company-name" }, CheckCompanyFormValidity);
    $("#company-industry-name").on("change", { InputFieldName: "company-industry-name" }, CheckCompanyFormValidity);
    $("#company-number-of-employees").on("change", { InputFieldName: "company-number-of-employees" }, CheckCompanyFormValidity);
    $("input[id$='email-address']").on("blur", { InputFieldName: "email-address" }, CheckCompanyFormValidity);
    $("input[id$='email-address']").on("input", { InputFieldName: "email-address" }, CheckCompanyFormValidity);
    $("input[id$='password']").on("blur", { InputFieldName: "password" }, CheckCompanyFormValidity);
    $("input[id$='password']").on("input", { InputFieldName: "password" }, CheckCompanyFormValidity);
    $("input[id$='contact-number']").on("blur", { InputFieldName: "contact-number" }, CheckCompanyFormValidity);
    $("input[id$='contact-number']").on("input", { InputFieldName: "contact-number" }, CheckCompanyFormValidity);
    $("input[id$='first-name']").on("blur", { InputFieldName: "first-name" }, CheckCompanyFormValidity);
    $("input[id$='first-name']").on("input", { InputFieldName: "first-name" }, CheckCompanyFormValidity);
    $("input[id$='last-name']").on("blur", { InputFieldName: "last-name" }, CheckCompanyFormValidity);
    $("input[id$='last-name']").on("input", { InputFieldName: "last-name" }, CheckCompanyFormValidity);
    $("#employee-company-name").on("change", { InputFieldName: "employee-company-name" }, CheckCompanyFormValidity);
    $("#employee-position").on("change", { InputFieldName: "employee-position" }, CheckCompanyFormValidity);
});

function EnableSelect2()
{
    $(".select2").select2();
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

        default:
            RegistrationTypeSpan.show();
            RegistrationTypeSpan.html("<sup>Please Select Registration Type</sup>");
            break;
    }
}

function CheckCompanyFormValidity(event)
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
                    var EmailAddressPrefix = "";
                    break;
            }
            var EmailAddress = $("#"+EmailAddressPrefix+"email-address").val();
            if (EmailAddress == null || EmailAddress == "")
            {
                $("#"+EmailAddressPrefix+"email-address-span").show();
                $("#"+EmailAddressPrefix+"email-address-span").html("<sup>Email Address is Required</sup>");
            }
            else
            {
                $("#"+EmailAddressPrefix+"email-address-span").hide();
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
                    var PasswordPrefix = "";
                    break;
            }
            var Password = $("#"+PasswordPrefix+"password").val();
            if (Password == null || Password == "")
            {
                $("#"+PasswordPrefix+"password-span").show();
                $("#"+PasswordPrefix+"password-span").html("<sup>Password is Required</sup>");
            }
            else
            {
                $("#"+PasswordPrefix+"password-span").hide();
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
