const express = require("express");
const router = express.Router();
const app = express();
const CategoryController = require("./categoryController");

app.use(express.json());

router.get("/", CategoryController.getAllCategory);

module.exports = router;
