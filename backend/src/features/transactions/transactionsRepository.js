const db = require("../../config/database");

class transactionsRepository {
  static async create(transaction) {
    const query = `
          INSERT INTO transactions (user_id, transaction_type, category_id, amount, notes, date) 
          VALUES ($1, $2, $3, $4, $5, $6) 
          RETURNING user_id, transaction_type, category_id, amount, notes, date
        `;
    const { user_id, transaction_type, category_id, amount, notes, date } =
      transaction;

    const { rows } = await db.query(query, [
      user_id,
      transaction_type,
      category_id,
      amount,
      notes,
      date,
    ]);
    return rows[0];
  }

  static async findTransactionsById(id) {
    let query = `
              SELECT transaction_id, user_id, transaction_type, category_id, amount, notes, date 
              FROM transactions 
              WHERE user_id = $1
            `;

    const { rows } = await db.query(query, [id]);
    return rows;
  }

  static async getCategoryById(category_id) {
    try {
      const query = `
        SELECT category_id
        FROM categories
        WHERE category_id = $1
      `;
      const { rows } = await db.query(query, [category_id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async updateTransaction(
    transaction_id,
    category_id,
        amount,
        notes,
        date
  ) {
    const query = `
      UPDATE transactions 
      SET category_id = $2, amount = $3, notes = $4, date = $5
      WHERE transaction_id = $1 
      RETURNING 
        user_id,
        transaction_type,
        category_id, 
        amount, 
        notes, 
        date
    `;

    const { rows } = await db.query(query, [
      transaction_id,
      category_id,
      amount,
      notes,
      date,
    ]);
    return rows[0];
  }
}

module.exports = transactionsRepository;
