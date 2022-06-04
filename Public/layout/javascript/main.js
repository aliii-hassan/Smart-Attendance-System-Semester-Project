// Page Bindings (This will Execute after Page Load)
$(function ()
{
    EnableSelect2();

    $("input[name='registration-type']").change(SignUpFormComponentsShowHide);
    $("#company-name").on("blur", { InputFieldName: "company-name" }, CheckCompanyFormValidity);
    $("#company-name").on("input", { InputFieldName: "company-name" }, CheckCompanyFormValidity);
});

function EnableSelect2()
{
    $(".select2").select2();
}

function SignUpFormComponentsShowHide()
{
    var RegistrationType = $("input[name='registration-type']:checked").val();
    var RegistrationTypeSpan = $("#registration-type-span");

    switch (RegistrationType)
    {
        case "Company":
            RegistrationTypeSpan.hide();
            break;

        case "Employee":
            RegistrationTypeSpan.hide();
            break;

        case "Student":
            RegistrationTypeSpan.hide();
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
        case ("company-name"):
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
        default:
            break;

    }
}
