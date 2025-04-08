const Blog = require("../models/blog");
const User = require("../models/user");

exports.getBlogs = (req, res, next) => {
	Blog.find()
		.then((blogs) => {
			res.status(200).json({ blogs: blogs });
			// res.render("blog", {
			//   pageTitle: "Homepage",
			//   blogs: blogs,
			//   isLoggedIn: req.session.isLoggedIn,
			// });
			// console.log(blogs);
		})
		.catch((err) => {
			console.log(err);
		});
};

// exports.getAddBlog = (req, res, next) => {
//   res.render("add-blog", {
//     pageTitle: "Add blog",
//     editing: false,
//   });
// };

exports.postAddBlog = (req, res, next) => {
	const title = req.body.title;
	const blogContent = req.body.blogContent;
	const imageUrl = req.body.imageUrl;
	// const userId = req.user.userId;
	const userId = req.userData.userId;
	console.log(userId);
	// const userBlogs = req.session.user.userBlogs;

	// const blogs = [{ ...userBlogs }];

	const blog = new Blog({
		title: title,
		blogContent: blogContent,
		imageUrl: imageUrl,
	});

	blog.save().then((blog) => {
		console.log(blog);
		return;
	});

	userBlogs.push(blog);

	// res.status(201).json({
	//   message: "Blog create",
	//   blog: { title: title, content: blogContent, imageUrl: imageUrl },
	// });

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
};

exports.getEditBlog = (req, res, next) => {
	res.render("blog/add-blog", {
		pageTitle: "Edit blog",
		editing: true,
	});
};

exports.postEditBlog = (req, res, next) => { };

exports.deleteBlog = (req, res, next) => {
	const blogId = req.body.blogId;
};

exports.getBlogDetail = async (req, res, next) => {
	const blogId = req.query.blog;
	try {
		const blog = await Blog.findOne({ _id: blogId });
		if (!blog) {
			throw new Error("No blog with this id!!");
		}

		res.status(200).json({
			message: "successful",
			blog: blog,
		});
	} catch (err) {
		res.status(401).json({
			message: "Blog fetching failed!",
			error: err.message,
		});
	}
};
