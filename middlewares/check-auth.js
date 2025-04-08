const jwt = require("jsonwebtoken");

// const HttpError = require('http')

module.exports = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next();
	}
	try {

		const token = req.headers.authorization; // Authorization: Bearer + token

		if (!token) {
			res.status(401).json({
				error: "Authentication failed, no token"
			});
			return;
		}

		jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET, (err, decodedToken) => {
			if (err) {
				res.status(401).json({
					message: "Authentication failed. Invalid token."
				})
				return;
			}
			req.userData = {
				userId: decodedToken.userId,
				userEmail: decodedToken.userEmail,
			};
		});
		next();
	} catch (error) {
		return next(error);
	}
};
