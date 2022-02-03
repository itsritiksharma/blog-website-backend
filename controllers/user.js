const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Blog = require("../models/blog");

const ObjectId = mongoose.ObjectId;

exports.getAddUser = (req, res, next) => {
  res.render("user/add-user", {
    pageTitle: "Add user",
  });
};

exports.getUser = (req, res, next) => {
  const userId = req.userData.userId;
  User.findOne({ _id: userId })
    .then((user) => {
      let token;

      token = jwt.sign(
        { userId: user._id, userEmail: user.userEmail },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        user,
        token,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.getLogin = (req, res, next) => {
//   res.render("user/login", {
//     pageTitle: "Login",
//   });
// };

exports.postEditUser = (req, res, next) => {
  const userId = req.params.userId;
  const userName = req.user.userName;
  const userEmail = req.user.userEmail;
  const password = req.user.password;
  const revisions = req.user.revisions;
  const user = [];
  user.push({
    userName: userName,
    userEmail: userEmail,
    password: password,
    revisions: revisions + 1,
  });
  User.updateOne(
    { _id: userId },
    {
      userName: userName,
      userEmail: userEmail,
      password: password,
      revisions: revisions + 1,
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "User updated successfully",
        user: user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUserBlogs = (req, res, next) => {
  const userId = req.params.userId;
  User.findOne({ _id: userId })
    .then((user) => {
      res.status(200).json({
        blogs: user.blogs,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddBlog = (req, res, next) => {
  const title = req.body.title;
  const blogContent = req.body.blogContent;
  const imageUrl = req.body.imageUrl;
  const token = req.body.token;
  const userId = req.params.userId;

  if (!token) {
    return res.status(401).json({
      message: "User unauthorised",
    });
  }

  const blog = new Blog({
    title: title,
    blogContent: blogContent,
    imageUrl: imageUrl,
  });

  let userBlogs;

  User.findOne({ _id: userId }).then((user) => {
    userBlogs = user.blogs;
    userBlogs.push(blog);
    User.updateOne({ _id: userId }, { blogs: userBlogs })
      .then(blog.save())
      .then((result) => {
        console.log("Blog Created");
        res.status(201).json({
          message: "Blog created",
          blog: { title: title, content: blogContent, imageUrl: imageUrl },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
