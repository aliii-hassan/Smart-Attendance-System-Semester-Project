// IMPORT EXPRESS-SESSION
const session = require("express-session");

// IMPORT EXPRESS
const express = require("express");
const app = express();

// USE EXPRESS-SESSION
app.use(session({secret: 'SessionPrivateKey', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 }, }));

// IMPORT MONGOOSE AND SET UP DATABASE CONNECTION
const mongoose = require("mongoose");
mongoose
    .connect("mongodb+srv://ALIHASSAN:ALISHBAPriNcEsS@smart-attendance-system.fa3yn.mongodb.net/smart-attendance-system-db", 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
    .then( () => 
    {
        console.log("CONNECTION ESTABLISHED WITH DATABASE");
    })
    .catch( (error => 
    {
        console.log("ERROR WHILE CONNECTING DATABASE: " + error);
    }));

// IMPORT JSON FOR REQUESTED DATA INPUT AS JSON ARRAY
app.use(express.json());

// For Data Submission on Method="Post"
app.use(express.urlencoded({ extended: true }))

// IMPORT EJS VIEW ENGINE
const ViewEngine = require('ejs');

// SET PUBLIC AND VIEW DIRECTORY PATHS
app.use( express.static("Public") );
var path = require('path');
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

// IMPORT MIDDLEWARES
const { Authentication } = require("./Middlewares/AuthenticationMiddleware");
const { CompanyAuthorization } = require("./Middlewares/CompanyAuthorization");
const { AdminAuthorization } = require("./Middlewares/AdminAuthorization");
const { EmployeeAuthorization } = require("./Middlewares/EmployeeAuthorization");
const { StudentAuthorization } = require("./Middlewares/StudentAuthorization");

// IMPORT ROUTES
const PublicRoutes = require("./Protocols/Routes/PublicRoutes");
const CompanyRoutes = require("./Protocols/Routes/CompanyRoutes");
const EmployeeRoutes = require("./Protocols/Routes/EmployeeRoutes");
const StudentRoutes = require("./Protocols/Routes/StudentRoutes");
const AdminRoutes = require("./Protocols/Routes/AdminRoutes");

// ASSIGN ROUTES & APIs
app.use("/", PublicRoutes);
app.use("/company/", Authentication, CompanyAuthorization, CompanyRoutes);
app.use("/employee/", Authentication, EmployeeAuthorization, EmployeeRoutes);
app.use("/student/", Authentication, StudentAuthorization, StudentRoutes);
app.use("/admin/", Authentication, AdminAuthorization, AdminRoutes);

// IMPORT APIs
const PublicAPIs = require("./Protocols/APIs/PublicAPIs");
const AttendanceAPIs = require("./Protocols/APIs/AttendanceAPIs");

app.use("/api/", PublicAPIs);
app.use('/api/attendances/', AttendanceAPIs);

// ASSIGN AND LISTEN PORT
const port = process.env.PORT || 3000
app.listen(port);
