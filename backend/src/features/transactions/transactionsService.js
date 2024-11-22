const TransactionsRepository = require("./transactionsRepository");

class TransactionsService {
    static async addTransaction(transactionData) {
        const { user_id, transaction_type, category_id, amount, notes, date } = transactionData;
        return await TransactionsRepository.create({ user_id, transaction_type, category_id, amount, notes, date });
    }
    static async getAllTransaction(filters) {
        return await TransactionsRepository.findAll(filters);
    }
}

module.exports = TransactionsService;
      