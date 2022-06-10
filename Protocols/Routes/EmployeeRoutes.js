const express = require("express");
const router = express.Router();

const EmployeeController = require("../../Controllers/EmployeeController");

const { EmployeeDashboard } = EmployeeController;

router.get("/dashboard", EmployeeDashboard);

module.exports = router;