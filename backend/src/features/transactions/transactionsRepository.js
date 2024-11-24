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

    static async findAll(filters){
            const { user_id, category_id, date_from, date_to } = filters;
    
            let query = `
              SELECT transaction_id, user_id, transaction_type, category_id, amount, notes, date 
              FROM transactions 
              WHERE 1=1
            `;
    
            const { rows } = await db.query(query);
            return rows; 
        }
}

module.exports = transactionsRepository;