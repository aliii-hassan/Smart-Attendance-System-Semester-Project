const express = require("express");
const router = express.Router();

const HomePageController = require("../../Controllers/HomePageController");
const UserController = require("../../Controllers/UserController");

router.get("/", HomePageController.HomePage);
router.get("/signup", UserController.SignUp);

module.exports = router;