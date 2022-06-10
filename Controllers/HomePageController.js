const HomePage = async (request, response) => 
{
    var error = "";
    if (request.params.error)
    {
        error = request.params.error;
    }

    response.render("./HomePage", {"error": error});
}

module.exports = {
    HomePage,
};