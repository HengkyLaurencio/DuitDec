const db = require('../../config/database');

class BudgetModel {
  static async getAllBudgets() {
    const query = `
      SELECT budget_id, user_id, category_id, period, start_date, budget_amout, used_amout 
      FROM budgets`;
    const result = await db.query(query);
    return result.rows;
  }

  static async getBudgetById(id) {
    const query = `
      SELECT budget_id, user_id, category_id, period, start_date, budget_amout, used_amout
      FROM budgets WHERE budget_id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async createBudget(user_id, category_id, period, start_date, budget_amout, used_amout) {
    const query = `
      INSERT INTO budgets (user_id, category_id, period, start_date, budget_amout, used_amout)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING budget_id, user_id, category_id, period, start_date, budget_amout, used_amout`;
    const result = await db.query(query, [user_id, category_id, period, start_date, budget_amout, used_amout]);
    return result.rows[0];
  }

  static async updateBudget(id, user_id, category_id, period, start_date, budget_amout, used_amout) {
    const query = `
      UPDATE budgets
      SET user_id = $2, category_id = $3, period = $4, start_date = $5, budget_amout = $6, used_amout = $7
      WHERE budget_id = $1
      RETURNING budget_id, user_id, category_id, period, start_date, budget_amout, used_amout`;
    const result = await db.query(query, [id, user_id, category_id, period, start_date, budget_amout, used_amout]);
    return result.rows[0];
  }

  static async deleteBudget(id) {
    const query = `DELETE FROM budgets WHERE budget_id = $1 RETURNING budget_id`;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = BudgetModel;
