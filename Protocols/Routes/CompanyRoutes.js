const express = require("express");
const router = express.Router();

const CompanyController = require("../../Controllers/CompanyController");

const { CompanyDashboard } = CompanyController;

router.get("/dashboard", CompanyDashboard);

module.exports = router;