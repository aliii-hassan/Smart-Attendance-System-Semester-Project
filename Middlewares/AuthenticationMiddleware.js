const { Users } = require("./../Models/UsersModel");
const bcrypt = require("bcryptjs");

const Authentication = async (request, response, next) =>
{
    if (!(request.session.activeUser))
    {
        response.redirect("/");
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
                    response.locals.activeUser = request.session.activeUser;
                    
                    switch (request.session.activeUser.userType)
                    {
                        case "Admin":
                            next();
                            break;

                        case "Company":
                            next();
                            break;

                        case "Employee":
                            next();
                            break;

                        case "Student":
                            next();
                            break;

                        default:
                            response.redirect("/");
                            break;
                    }
                }
                else
                {
                    response.redirect("/");
                }
            }
            else
            {
                response.redirect("/");
            }
        }
        else
        {
            response.redirect("/");
        }
    }
}

module.exports = {
    Authentication,
}