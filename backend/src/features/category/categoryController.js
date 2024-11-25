const CategoryService = require("./categoryService");

class CategoryController {
  static async getAllCategory(req, res) {
    try {
        const categories = await CategoryService.getAllCategory();
        res.status(200).json(categories);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories', error });
      }
  }
}

module.exports = CategoryController;
