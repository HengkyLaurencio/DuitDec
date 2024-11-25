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

  static async getCategoryById(){
    return await TransactionsRepository.getCategoryById(category_id)
  }
}

module.exports = TransactionsService;
