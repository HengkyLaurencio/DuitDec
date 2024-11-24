const TransactionsService = require("./transactionsService");
const TransactionsRepository = require("./transactionsRepository");

class TransactionsController {
    static async addIncome(req, res) {
        try {
            // user id harus diambil dari tabel user gabole manual
            // category id harus diambil dari tabel category juga
            const result = await TransactionsService.addTransaction({ 
                ...req.body, 
                transaction_type: "income" 
            });
            res.status(201).json({ message: "Income added successfully", data: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async addOutcome(req, res) {
        try {
            // user id harus diambil dari tabel user gabole manual
            // category id harus diambil dari tabel category juga
            const result = await TransactionsService.addTransaction({ 
                ...req.body, 
                transaction_type: "outcome" 
            });
            res.status(201).json({ message: "Outcome added successfully", data: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getTransactions(req, res) {
        try {
            const userId = req.query.user_id; 

            const transactions = await TransactionsRepository.findAll({ user_id: userId });
            return res.status(200).json({ transactions });
        } catch (error) {
            console.error("Error fetching transactions:", error);
            return res.status(500).json({ message: "An error occurred while fetching transactions" });
        }
    }
}
  
module.exports = TransactionsController;