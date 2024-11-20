const jwt = require("jsonwebtoken");
const data = require("../config/env");

class AuthMiddleware {
  static async verifyToken(req, res, next) {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Missing Token" });
    }
    try {
      const decoded = jwt.verify(token, data.secret);
      req.user = decoded;
      console.log("token success");
      next();
    } catch (error) {
      console.error("Token Verification Failed: ", error.message);
      res.status(401).json({ message: "Token Invalid!" });
    }
  }
}
module.exports = AuthMiddleware;

