const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");
const checkAuth = require("../middlewares/check-auth");

// /user/edit/:userId => GET : "GET THE EDIT USER PAGE"
// router.get("/edit/:userId", userController.getEditUser);

// { ADD ROUTES WHICH REQUIRE AUTHORIZATION BELOW }
router.use(checkAuth);

router.get("/", userController.getUser);

// /user/:userId/blogs => GET : "GET ALL THE BLOGS BY USER"
router.get("/:userId/blogs", userController.getUserBlogs);

// /user/edit/:userId => POST : "SUBMIT/POST THE EDITED USER DETAILS"
router.post("/edit/:userId", userController.postEditUser);

module.exports = router;
