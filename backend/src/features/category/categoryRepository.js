const db = require('../../config/database');

class TransactionsRepository {
 
  static async findAll() {
    try {
      const query = `
        SELECT 
          category_id
        FROM categories
      `;
      
      const { rows } = await db.query(query);
      return rows;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
}

module.exports = TransactionsRepository;