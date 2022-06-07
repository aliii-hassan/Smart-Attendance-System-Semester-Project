const express = require("express");
const router = express.Router();

const StudentController = require("../../Controllers/StudentController");

const { StudentDashboard } = StudentController;

router.get("/dashboard", StudentDashboard);

module.exports = router;