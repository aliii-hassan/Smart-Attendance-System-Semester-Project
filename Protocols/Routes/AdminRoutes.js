const express = require("express");
const router = express.Router();

const AdminController = require("../../Controllers/AdminController");

const { AdminDashboard } = AdminController;

router.get("/dashboard", AdminDashboard);

module.exports = router;