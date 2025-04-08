const express = require("express");
const { check, body } = require("express-validator");

const router = express.Router();

const authController = require("../controllers/auth");

// /auth/add-user => GET: "GET THE SIGNUP PAGE"
// router.get("/signup", authController.getAddauth);

// /auth/signup => POST: "ADD USER IN DATABASE"
router.post(
	"/signup",
	[
		body("userEmail", "Enter valid email").isEmail(),
		body("password", "Password should be of 6 characters long.").isLength({
			min: 6,
		}),
	],
	authController.postSignup
);

// /auth/login => GET : "GET THE LOGIN PAGE"
// router.get("/login", authController.getLogin);

// /auth/login => POST : "POST THE USER DATA TO GET THE auth FROM DATABASE"
router.post(
	"/login",
	[
		body("userEmail", "Email is not valid.").isEmail(),
		body("password", "Password should be of 6 characters long.").isLength({
			min: 6,
		}),
	],
	authController.postLogin
);

// /auth/logout => POST : "LOG THE USER OUT BY SETTING THE TOKEN TO NULL"
router.post("/logout", authController.postLogout);

router.get("/testing", authController.testing);

module.exports = router;
