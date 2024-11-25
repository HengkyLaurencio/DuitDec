const CategoryService = require("./categoryService");
const CategoryRepository = require("./categoryRepository");

class CategoryController {
  static async getAllCategory(req, res) {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories', error });
      }
  }
}

module.exports = CategoryController;
