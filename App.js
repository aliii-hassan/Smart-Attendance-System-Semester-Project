// IMPORT EXPRESS
const express = require("express");
const app = express();
// IMPORT JSON FOR REQUESTED DATA INPUT AS JSON ARRAY
app.use(express.json());

// IMPORT EJS VIEW ENGINE
const ViewEngine = require('ejs');

// SET PUBLIC AND VIEW DIRECTORY PATHS
app.use( express.static("Public") );
var path = require('path');
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

// IMPORT ROUTES
const PublicRoutes = require("./Protocols/Routes/PublicRoutes");

// IMPORT APIs

// ASSIGN ROUTES & APIs
app.use("/", PublicRoutes);

// ASSIGN AND LISTEN PORT
const port = process.env.PORT || 3000
app.listen(port);
