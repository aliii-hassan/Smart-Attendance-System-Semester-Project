$(function()
{
    // Enable Table (JQuery Table)
    EnableTable();

    // Enable Date Time Picker
    EnableDateTimePicker();

    // Enable Select2 (Search Option in Select Tag)
    EnableSelect2();

    // Get User IP Address and GPS
    UserIpAddressAndGps();

    // Show/Hide Modals on Button Click
    $(window).on("scroll", SiteIntroductionAnimatedView);
    $("[id$='attendance-record-button']").click(ShowAttendanceCrudModal);
    $("#attendance-crud-modal-close-button").click(CloseAttendanceCrudModal);

    // AttendeeUserTypeOnChange Function Call
    $("input[name='attendeeUserType']").on("change", AttendeeUserTypeOnChange);
    $("#current-attendance-record-attendee-profile").on("change", "", GetUserAccoundID);

    // Form Submission
    $("#attendance-crud-modal-submit-button").click(SetIpAndGpsBeforeSubmission);

    // Set Rules for Validation before Submission
    $("form[id='attendance-form']").validate({
        rules: 
        {
            "attendeeUserType": "required",
            "current-attendance-record-attendee-profile": "required",
            "current-attendance-record-date-time": "required",
        
            messages: 
            {
                "attendeeUserType": "Attendee's User Type is Required",
                "current-attendance-record-attendee-profile": "Attendee's Profile Data is Required",
                "current-attendance-record-date-time": "Date & Time is Required",
            }
        }
      });
});

function UserIpAddressAndGps()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition (function (currentPosition)
        {
            var Latitude = currentPosition.coords.latitude;
            var Longitude = currentPosition.coords.longitude;

            var currentPositionLink = "http://maps.google.com/maps?q="+Latitude+","+Longitude+"&z=17&output=embed";
            var embedGpsLocation = "<label class=\"form-label font-weight-bold\" for=\"current-attendance-record-gps-location\">"+
                                        "Your Current Location: "+
                                    "</label>"+
                                    "<span id=\"current-attendance-record-gps-location-span\" class=\"asterisk ml-1 font-weight-bold text-danger\">"+
                                        "<sup>(It is Auto Detected. You Cannot Change it)</sup>"+
                                    "</span>"+
                                    "<iframe frameborder=\"0\" style=\"border: 0; width: 100%; height: 15em;\""+ 
                                    "src=\""+currentPositionLink+"\"></iframe>";

            $('#current-attendance-record-gps-location-div').show('fast', function () {
                $(this).html(embedGpsLocation);
            });
        });
    }
    else
    {
        $('#current-attendance-record-gps-location-div').show('fast', function () {
            $(this).html("<label class=\"form-label font-weight-bold\" for=\"current-attendance-record-gps-location\">"+
                            "Your Current Location: "+
                        "</label>"+
                        "<span id=\"current-attendance-record-gps-location-span\" class=\"asterisk ml-1 font-weight-bold text-danger\">"+
                            "<sup>(It is Auto Detected. You Cannot Change it)</sup>"+
                        "</span>"+
                        "<span class=\"asterisk ml-1 font-weight-bold text-danger\">Current Location Cannot Shown on This Browser</span>");
        });
    }

    $.getJSON("https://api.ipify.org/?format=json", function(currentIP) 
    {
        $('#current-attendance-record-ip-address').val(currentIP.ip);
    });
}

function EnableTable() 
{
    $('#attendance-data-table').DataTable();
}

function EnableDateTimePicker() 
{
    $('#current-attendance-record-date-time').flatpickr({
        enableTime: true,
        static: true,
        dateFormat: "d-m-Y G:i K",
        defaultDate: new Date(),
    });
}

function EnableSelect2()
{
    $('#current-attendance-record-attendee-profile').select2({
        dropdownParent: $('#AttendanceCrudModal'),
        // container: "#AttendanceCrudModal",
    });
}

function AttendeeUserTypeOnChange()
{
    var attendeeUserType = $("input[name='attendeeUserType']:checked").val();
    switch (attendeeUserType)
    {
        case "Employee":
            $('#AttendanceCrudModal').modal('show');
            GetEmployeesData(attendeeUserType);
            break;
        case "Student":
            $('#AttendanceCrudModal').modal('show');
            GetStudentsData(attendeeUserType);
            break;
        default:
            break;
    }
    $('#AttendanceCrudModal').modal('show');
}

function ShowAttendanceCrudModal()
{
    UserIpAddressAndGps();
    
    if ($(this).attr('id') != "delete-attendance-record-button")
    {
        $('#AttendanceCrudModal').modal('show')
    }

    var currentAttendanceRecordIdDiv =  $(this).find("[name='current-attendance-record-id-div']");
    var currentAttendanceRecordId =  $(this).find("[name='current-attendance-record-id-div']").text();

    switch($(this).attr('id'))
    {
        case "insert-attendance-record-button":
            var attendeeUserType = $("input[name='attendeeUserType']:checked").val();
            switch (attendeeUserType)
            {
                case "Employee":
                    $('#AttendanceCrudModal').modal('show');
                    GetEmployeesData("");
                    break;
                case "Student":
                    $('#AttendanceCrudModal').modal('show');
                    GetStudentsData("");
                    break;
                default:
                    break;
            }
            break;

        case "update-attendance-record-button":
            $("#current-attendance-record-id").val(currentAttendanceRecordId);
            var sendURL = "/api/attendances/"+ currentAttendanceRecordId +"";

            $.ajax(
            {
                type: "get",
                url: sendURL,
                contentType: 'application/json',
                data: JSON.stringify({}),
                success: function (response) {
                    if (response.status)
                    {
                        $('#AttendanceCrudModal').modal('show');

                        $("[name='userAccountID']").val(response.data.userAccountID);
                        $("[name='attendeeUserType']").val(response.data.attendeeUserType);
                        $("[value='"+response.data.attendeeUserType+"']").attr("checked", "checked");
                        $("[name='attendanceDateAndTime']").val(response.data.attendanceDateAndTime);
                        $("[name='attendeeIpAddress']").val(response.data.attendeeIpAddress);
                        $("[name='attendeeGpsLocation']").val(response.data.attendeeGpsLocation);
                        
                        var attendeeUserType = $("input[name='attendeeUserType']:checked").val();
                        switch (attendeeUserType)
                        {
                            case "Employee":
                                GetEmployeesData(response.attendeeProfile);
                                break;
                            case "Student":
                                GetStudentsData(response.data.attendeeProfile);
                                break;
                            default:
                                break;
                        }
                    }
                    else
                    {
                        toastr.error(error);
                    }
                },
                error: function (error) {
                    toastr.error(error);
                }
            });
            break;
        
        case "delete-attendance-record-button":
            if (confirm("Are You Sure to Delete the Record"))
            {
                var sendURL = "/api/attendances/"+ currentAttendanceRecordId +"";

                $.ajax(
                {
                    type: "delete",
                    url: sendURL,
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (response) {
                        currentAttendanceRecordIdDiv.parents("tr").remove();
                        toastr.success(response.message);
                    },
                    error: function (error) {
                        toastr.error(response.message);
                    }
                });
            }
            break;
        
        default:
            $('#AttendanceCrudModal').modal('show');
            break;
    }
}

function CloseAttendanceCrudModal()
{
    $('#AttendanceCrudModal').modal('hide');
}

function GetEmployeesData(inputParameter)
{
    $.ajax({
        type: "get",
        url: "/api/employees",
        contentType: 'application/json',
        data: "",
        success: function (response) 
        {
            var embedHtml;
            if (response.status)
            {
                $('#current-attendance-record-attendee-profile').empty();
                embedHtml = "<option value=\"\" disabled selected>Select Attendee's Profile</option>";
                
                response.data.forEach(res => {
                    embedHtml = embedHtml + "<option value=\""+ res['_id'] +"\">"+ res.firstName; res.firstName; +"</option>";
                });
            }
            else
            {
                $('#current-attendance-record-attendee-profile').empty();
                embedHtml = "<option value=\"\" disabled selected>Select Attendee's Profile</option>";
                toastr.error(response.message);
            }

            $('#current-attendance-record-attendee-profile').append(embedHtml);
            if (!(inputParameter == null || inputParameter == ""))
            {
                $("#current-attendance-record-attendee-profile option[value='"+ inputParameter +"']").attr('selected', 'selected');
            }

            $('#AttendanceCrudModal').modal('show');
        },
        error: function (error) {
            toastr.error(error);
            $('#AttendanceCrudModal').modal('show');
        }
    });
}

function GetStudentsData(inputParameter)
{
    $.ajax({
        type: "get",
        url: "/api/students",
        contentType: 'application/json',
        data: "",
        success: function (response) 
        {
            var embedHtml;
            if (response.status)
            {
                $('#current-attendance-record-attendee-profile').empty();
                embedHtml = "<option value=\"\" disabled selected>Select Attendee's Profile</option>";
                
                response.data.forEach(res => {
                    embedHtml = embedHtml + "<option value=\""+ res['_id'] +"\">"+ res.firstName; res.firstName; +"</option>";
                });
            }
            else
            {
                $('#current-attendance-record-attendee-profile').empty();
                embedHtml = "<option value=\"\" disabled selected>Select Attendee's Profile</option>";
                toastr.error(response.message);
            }

            $('#current-attendance-record-attendee-profile').append(embedHtml);
            if (!(inputParameter == null || inputParameter == ""))
            {
                $("#current-attendance-record-attendee-profile option[value='"+ inputParameter +"']").attr('selected', 'selected');
            }

            $('#AttendanceCrudModal').modal('show');
        },
        error: function (error) {
            toastr.error(error);
            $('#AttendanceCrudModal').modal('show');
        }
    });
}

function GetUserAccoundID()
{
    var AttendeeProfileId = $("#current-attendance-record-attendee-profile").val();
    var attendeeUserType = $("input[name='attendeeUserType']:checked").val();

    var sendURL;

    switch (attendeeUserType)
    {
        case "Employee":
            sendURL = "/api/employees/";
            break;
        
        case "Student":
            sendURL = "/api/students/";
            break;

        default:
            break;
    }
     
    sendURL = "" + sendURL + "" + AttendeeProfileId + "";

    $.ajax({
        type: "get",
        url: sendURL,
        contentType: 'application/json',
        data: "",
        success: function (response) 
        {
            if (response.status)
            {
                $('#current-attendance-record-user-id').val(response.data.userProfile);
                $('#AttendanceCrudModal').modal('show');
            }
            else
            {
                toastr.error(response.message);
                $('#AttendanceCrudModal').modal('show');
            }
        },
        error: function (error) {
            toastr.error(error);
            $('#AttendanceCrudModal').modal('show');
        }
    });
}

function SetIpAndGpsBeforeSubmission(event)
{
    event.preventDefault();

    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition (function (currentPosition)
        {
            var Latitude = currentPosition.coords.latitude;
            var Longitude = currentPosition.coords.longitude;
            var attendeeGpsLocation = "" + Latitude +","+ Longitude + "";
            $("#current-attendance-record-gps-location-value").val(attendeeGpsLocation);

            $.getJSON("https://api.ipify.org/?format=json", function(currentIP) 
            {
                $('#current-attendance-record-ip-address').val(currentIP.ip);
                AttendanceFormSubmission();
            });
        });
    }
    else
    {
        $('#current-attendance-record-gps-location-div').show('fast', function () {
            $(this).html("<label class=\"form-label font-weight-bold\" for=\"current-attendance-record-gps-location\">"+
                            "Your Current Location: "+
                        "</label>"+
                        "<span id=\"current-attendance-record-gps-location-span\" class=\"asterisk ml-1 font-weight-bold text-danger\">"+
                            "<sup>(It is Auto Detected. You Cannot Change it)</sup>"+
                        "</span>"+
                        "<span class=\"asterisk ml-1 font-weight-bold text-danger\">"+
                            "Current Location Cannot Shown on This Browser"+
                        "</span>");
        });
    }
}

function AttendanceFormSubmission()
{
    $("#attendance-form").validate();

    var DataToSubmit = {};
    var SubmissionMethod = "post";
    var attendanceRecordID = "";
    var sendURL = "/api/attendances";

    if (!(($("#current-attendance-record-id")).val() == null || ($("#current-attendance-record-id")).val() == ""))
    {
        SubmissionMethod = "put";
        attendanceRecordID = $("#current-attendance-record-id").val();
        sendURL = "/api/attendances/"+attendanceRecordID+"";
    }

    DataToSubmit.userAccountID = $("[name='userAccountID']").val();
    DataToSubmit.attendeeUserType = $("[name='attendeeUserType']:checked").val();
    DataToSubmit.attendeeProfileID = $("[name='attendeeProfileID']").val();
    DataToSubmit.attendanceDateAndTime = $("[name='attendanceDateAndTime']").val();
    DataToSubmit.attendeeIpAddress = $("[name='attendeeIpAddress']").val();
    DataToSubmit.attendeeGpsLocation = $("[name='attendeeGpsLocation']").val();

    $.ajaxSetup({
        headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        type: SubmissionMethod,
        url: sendURL,
        contentType: 'application/json',
        data: JSON.stringify(DataToSubmit),
        success: function (response) 
        {
            if (response.status)
            {
                $("#current-attendance-record-id").val(response.data['_id']);
                toastr.success(response.message);

                var newDateObject = new Date(response.data.attendanceDateAndTime);
                var embedHtml = "<tr>"+
                                    "<td>"+
                                        response.data.attendeeProfile.firstName +" "+ response.data.attendeeProfile.lastName+
                                    "</td>"+
                                    
                                    "<td>"+
                                        response.data.attendeeUser.emailAddress +
                                    "</td>"+
                                    
                                    "<td>"+
                                        response.data.attendeeUserType +
                                    "</td>"+
                                    
                                    "<td>"+
                                        response.data.attendeeUser.contact +
                                    "</td>"+
                                    
                                    "<td>"+
                                        newDateObject.getDate()+"-"+newDateObject.getMonth()+"-"+newDateObject.getFullYear() +
                                    "</td>"+
                                    
                                    "<td>"+
                                        newDateObject.toISOString().split('T')[1].split('.')[0] +
                                    "</td>"+
                                    
                                    "<td>"+
                                        response.data.attendeeIpAddress +
                                    "</td>"+

                                    "<td>"+
                                        "<a id=\"update-attendance-record-button\" class=\"btn btn-sm btn-floating text-light col-5\" href=\"#\""+
                                            "role=\"button\" data-toggle=\"modal\">"+
                                            "<div name=\"current-attendance-record-id-div\" hidden>"+response.data['_id']+"</div>"+
                                            "<i class=\"fa\">"+
                                                "<img src=\"/images/EditRecordIcon.png\" alt=\"Edit Record\">"+
                                            "</i>"+
                                        "</a>"+
                                        "<a id=\"delete-attendance-record-button\" class=\"btn btn-sm btn-floating text-light col-5\" href=\"#\" role=\"button\">"+
                                            "<div name=\"current-attendance-record-id-div\" hidden>"+response.data['_id']+"</div>"+
                                            "<i class=\"fa\">"+
                                                "<img src=\"/images/DeleteRecordIcon.png\" alt=\"Delete Record\">"+
                                            "</i>"+
                                        "</a>"+
                                    "</td>"+
                                "</tr>";

                $("#attendance-data-table tbody").appendChild(embedHtml);

                document.getElementById('attendance-form').reset();                            
                $('#attendance-crud-modal-close-button').click();
            }
            else
            {
                toastr.error(response.message);
            }
        },
        error: function (error) {
            toastr.error(error);
        }
    });
}