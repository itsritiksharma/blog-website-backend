const jwt = require("jsonwebtoken");

// const HttpError = require('http')

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: Bearer + token

    if (!token) {
      throw new Error("Authentication failed, no token");
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
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
