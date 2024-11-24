const db = require("../../config/database");

class transactionsRepository {
    static async create(transaction) {
        const query = `
          INSERT INTO transactions (user_id, transaction_type, category_id, amount, notes, date) 
          VALUES ($1, $2, $3, $4, $5, $6) 
          RETURNING user_id, transaction_type, category_id, amount, notes, date
        `;
        const { user_id, transaction_type, category_id, amount, notes, date } = transaction;

        const { rows } = await db.query(query, [user_id, transaction_type, category_id, amount, notes, date]);
        return rows[0]; 
    }
}

module.exports = transactionsRepository;