const db = require("../../config/database");

class AccRepository{
// Get all accounts by user_id
   static async getAccountsByUserId(userId) {
    const query = `
      SELECT account_id, user_id, account_name, balance 
      FROM accounts 
      WHERE user_id = $1
    `;
    const { rows } = await db.query(query, [userId]);

    // Menghitung total balance
    const total = rows.reduce((acc, account) => acc + Number(account.balance), 0);
    
    return { accounts: rows, total };
  }
  // Create new account
  static async createAccount(userId, accountName, balance) {
    const query = `
      INSERT INTO accounts (user_id, account_name, balance) 
      VALUES ($1, $2, $3) 
      RETURNING account_id, user_id, account_name, balance
    `;
    const { rows } = await db.query(query, [userId, accountName, balance]);
    return rows[0];
  }

  // Update account balance
  static async updateAccount(accountId, accountName, balance) {
    const query = `
      UPDATE accounts 
      SET account_name = $1, balance = $2 
      WHERE account_id = $3 
      RETURNING account_id, user_id, account_name, balance
    `;
    const { rows } = await db.query(query, [accountName, balance, accountId]);
    return rows[0];
  }

  // Delete an account
  static async deleteAccount(accountId) {
    const query = `DELETE FROM accounts WHERE account_id = $1 RETURNING account_id`;
    const { rows } = await db.query(query, [accountId]);
    return rows[0];
  }

}

module.exports = AccRepository;
