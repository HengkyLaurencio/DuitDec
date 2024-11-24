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
}
  
module.exports = TransactionsController;