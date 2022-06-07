const express = require("express");
const router = express.Router();

const HomePageController = require("../../Controllers/HomePageController");
const UserController = require("../../Controllers/UserController");

const { HomePage } = HomePageController;
const { SignUp, RegisterNewUser, SignIn, LoginUser, PasswordReset, PasswordRecovered } = UserController;

router.get("/", HomePage);
router.get("/signup", SignUp);
router.post("/signup", RegisterNewUser);
router.get("/signin", SignIn);
router.post("/signin", LoginUser);
router.get("/password-reset", PasswordReset);
router.post("/password-reset", PasswordRecovered);

module.exports = router;