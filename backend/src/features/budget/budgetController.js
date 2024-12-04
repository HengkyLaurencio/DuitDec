const BudgetService = require('./budgetService');

class BudgetController {
  static async getAllBudgets(req, res) {
    try {
      const budgets = await BudgetService.getAllBudgets();
      res.status(200).json(budgets);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving budgets', error });
    }
  }

  static async getBudgetById(req, res) {
    try {
      const { id } = req.params;
      const budget = await BudgetService.getBudgetById(id);
      if (!budget) {
        return res.status(404).json({ message: 'Budget not found' });
      }
      res.status(200).json(budget);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving budget', error });
    }
  }

  static async createBudget(req, res) {
    try {
      const { user_id, category_id, period, start_date, budget_amout, used_amout } = req.body;
      const newBudget = await BudgetService.createBudget(user_id, category_id, period, start_date, budget_amout, used_amout);
      res.status(201).json(newBudget);
    } catch (error) {
      res.status(500).json({ message: 'Error creating budget', error });
    }
  }

  static async updateBudget(req, res) {
    try {
      const { id } = req.params;
      const { user_id, category_id, period, start_date, budget_amout, used_amout } = req.body;
      const updatedBudget = await BudgetService.updateBudget(id, user_id, category_id, period, start_date, budget_amout, used_amout);
      if (!updatedBudget) {
        return res.status(404).json({ message: 'Budget not found' });
      }
      res.status(200).json(updatedBudget);
    } catch (error) {
      res.status(500).json({ message: 'Error updating budget', error });
    }
  }

  static async deleteBudget(req, res) {
    try {
      const { id } = req.params;
      const deletedBudget = await BudgetService.deleteBudget(id);
      if (!deletedBudget) {
        return res.status(404).json({ message: 'Budget not found' });
      }
      res.status(200).json({ message: 'Budget deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting budget', error });
    }
  }
}

module.exports = BudgetController;
