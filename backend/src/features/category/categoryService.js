const CategoryRepository = require("./categoryRepository");

class CategoryService {
  static async getAllCategory() {
    return await CategoryRepository.findAll();
  }
}

module.exports = CategoryService;
