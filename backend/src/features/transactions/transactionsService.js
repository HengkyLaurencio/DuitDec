const TransactionsRepository = require("./transactionsRepository");

class TransactionsService {
  static async addTransaction(transactionData) {
    const { user_id, transaction_type, category_id, amount, notes, date } =
      transactionData;
    return await TransactionsRepository.create({
      user_id,
      transaction_type,
      category_id,
      amount,
      notes,
      date,
    });
  }

  static async findTransactionsById(id) {
    return await TransactionsRepository.findTransactionsById(id);
  }

  static async getAllTransactions() {
    try {
      return await TransactionsRepository.findAllTransactions();
    } catch (error) {
      throw new Error("Error in TransactionsService: " + error.message);
    }
  }

  static async getAllDebts() {
    
  }

  static async getCategoryById(){
    return await TransactionsRepository.getCategoryById(category_id)
  }

  static async updateTransaction(transaction_id, category_id,
    amount,
    notes,
    date) {
    try {
      const result = await TransactionsRepository.updateTransaction(transaction_id, category_id,
        amount,
        notes,
        date);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteTransaction(transactionId) {
      const result = await TransactionsRepository.deleteTransaction(transactionId);
      return result;
  }
}

module.exports = TransactionsService;
