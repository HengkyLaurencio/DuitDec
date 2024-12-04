const BudgetModel = require('./budgetRepository');

class BudgetService {
  static async getAllBudgets() {
    return BudgetModel.getAllBudgets();
  }

  static async getBudgetById(id) {
    return BudgetModel.getBudgetById(id);
  }

  static async createBudget(user_id, category_id, period, start_date, budget_amout, used_amout) {
    return BudgetModel.createBudget(user_id, category_id, period, start_date, budget_amout, used_amout);
  }

  static async updateBudget(id, user_id, category_id, period, start_date, budget_amout, used_amout) {
    return BudgetModel.updateBudget(id, user_id, category_id, period, start_date, budget_amout, used_amout);
  }

  static async deleteBudget(id) {
    return BudgetModel.deleteBudget(id);
  }
}

module.exports = BudgetService;
