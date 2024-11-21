const AuthService = require("./authService");
const AuthModel = require("./authRepository");


class AuthController {
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await AuthModel.getUserByEmail(email);
      const loginSuccess = await AuthService.checkCredentials(email, password);
      if (!loginSuccess) {
        return res.status(400).json({ message: "Wrong Email or Password!" });
      }
      res.json({ loginSuccess });
    } catch (error) {
      return next(error);
    }
  } 
  
}
module.exports = AuthController;

