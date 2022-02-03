const express = require("express");

const router = express.Router();

const blogController = require("../controllers/blog");
const userController = require("../controllers/user");

const checkAuth = require("../middlewares/check-auth");

// / =>  GET: "GET ALL THE BLOGS AT INDEX (fetch blog feed)"
router.get("/", blogController.getBlogs);

// /blog-detail?blog=blogId =>  GET: "GET THE BLOG DETAIL PAGE"
router.get("/blog-detail", blogController.getBlogDetail);

// /add-blog => GET: "RENDERS THE ADD BLOG PAGE"
// router.get("/add-blog", blogController.getAddBlog);

// { ADD ROUTES WHICH REQUIRE AUTHORIZATION BELOW }
router.use(checkAuth);

// /add-blog => POST: "SAVES THE BLOG IN DATABASE"
router.post("/:userId/add-blog", userController.postAddBlog);

// /edit-blog/:blogId => GET : "GET THE EDIT PAGE FOR BLOG"
// router.get("/edit-blog/:blogId", blogController.getEditBlog);

// /edit-blog/:blogId =>  POST: "GET THE ID OF BLOG"
router.post("/edit-blog/:blogId", blogController.postEditBlog);

// /delete-blog/:blogId => POST : "DELETE THE BLOG WITH BLOG ID"
router.post("/delete-blog/:blogId", blogController.deleteBlog);

module.exports = router;
