const HomePage = async (request, response, next) => 
{
    response.render("./HomePage");
}

const AboutUsPage = async (request, response) => 
{
    response.render("./AboutUsPage");
}

const ContactUsPage = async (request, response) => 
{
    response.render("./ContactUsPage");
}

module.exports = {
    HomePage, AboutUsPage, ContactUsPage,
};