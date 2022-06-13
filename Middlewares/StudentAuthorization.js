const { Users } = require("./../Models/UsersModel");
const bcrypt = require("bcryptjs");

const StudentAuthorization = async (request, response, next) =>
{
    if (!(request.session.activeUser))
    {
        response.status(500).send("Unauthorized Access Denied");
    }
    else    
    {
        if (!(request.session.activeUser == null || request.session.activeUser == ""))
        {
            var CurrentUser = await Users.findById(request.session.activeUser['_id']);
            if (!(CurrentUser == null || CurrentUser == ""))
            {
                if (request.session.activeUser.password == CurrentUser.password)
                {
                    if (request.session.activeUser.userType == "Student")
                    {
                        next();
                    }
                    else
                    {
                        response.status(500).send("Unauthorized Access Denied");
                    }
                }
                else
                {
                    response.status(500).send("Unauthorized Access Denied");
                }
            }
            else
            {
                response.status(500).send("Unauthorized Access Denied");
            }
        }
        else
        {
            response.status(500).send("Unauthorized Access Denied");
        }
    }
}

module.exports = {
    StudentAuthorization,
}