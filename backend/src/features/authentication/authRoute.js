const express = require("express");
const router = express.Router();
const app = express();
const AuthController = require("./authController");
const AuthMiddleware = require("../../middlewares/authMiddleware");

app.use(express.json());
router.post("/login", AuthController.login)

//test protected api
router.get("/userinfo", AuthMiddleware.verifyToken, (req,res) => {
  res.json({user: req.user});
})

module.exports = router;
