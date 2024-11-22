const AuthModel = require("./authRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const data = require("../../config/env");

class AuthService {
  
  static async checkCredentials(email, password) {
    const user = await AuthModel.getUserByEmail(email);
    const passCheck = await bcrypt.compare(password, user.password);
    if (user && passCheck) {
      console.log("User authenticated:", {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
      });
      return {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        token: jwt.sign({ userId: user.id }, data.secret, { expiresIn: "1h" }),
      };
    }
    return null;
  }
  
}
module.exports = AuthService;
    