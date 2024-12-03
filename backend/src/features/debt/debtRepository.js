const db = require('../../config/database');

class DebtRepository {
  static async getAllDebts() {
    const query = `
      SELECT debt_id, name, debt_type, amount, debt_residual, date_start, date_end, user_id 
      FROM debts
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async getDebtById(debtId) {
    const query = `
      SELECT debt_id, name, debt_type, amount, debt_residual, date_start, date_end, user_id 
      FROM debts 
      WHERE debt_id = $1
    `;
    const result = await db.query(query, [debtId]);
    return result.rows[0];
  }

  static async createDebt({ name, debt_type, amount, debt_residual, date_start, date_end, user_id, }) {
    const query = `
      INSERT INTO debts (name, debt_type, amount, debt_residual, date_start, date_end, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING debt_id, name, debt_type, amount, debt_residual, date_start, date_end, user_id
    `;
    const values = [name, debt_type, amount, debt_residual, date_start, date_end, user_id];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async updateDebt(debtId, { name, debt_type, amount, debt_residual, date_start, date_end }) {
    const query = `
      UPDATE debts
      SET name = $2, debt_type = $3, amount = $4, debt_residual = $5, date_start = $6, date_end = $7
      WHERE debt_id = $1
      RETURNING debt_id, name, debt_type, amount, debt_residual, date_start, date_end, user_id
    `;
    const values = [debtId, name, debt_type, amount, debt_residual, date_start, date_end];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async deleteDebt(debtId) {
    const query = `
      DELETE FROM debts WHERE debt_id = $1 RETURNING debt_id
    `;
    const result = await db.query(query, [debtId]);
    return result.rows[0];
  }
}

module.exports = DebtRepository;
