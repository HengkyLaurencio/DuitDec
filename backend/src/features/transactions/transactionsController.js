const TransactionsService = require("./transactionsService");
const TransactionsRepository = require("./transactionsRepository");

class TransactionsController {
  static async addIncome(req, res) {
    try {
      const { id } = req.params;
      const {category_id} = req.body;
      const result = await TransactionsService.addTransaction({
        ...req.body,
        transaction_type: "income",
        user_id : id,
      });
      const category = await TransactionsRepository.getCategoryById(category_id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res
        .status(201)
        .json({ message: "Income added successfully", data: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async addOutcome(req, res) {
    try {
      const { id } = req.params;
      const {category_id} = req.body;
      const result = await TransactionsService.addTransaction({
        ...req.body,
        transaction_type: "outcome",
        user_id : id,
      });
      const category = await TransactionsRepository.getCategoryById(category_id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      } 
      res
        .status(201)
        .json({ message: "Outcome added successfully", data: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getTransactionsById(req, res) {
    try {
      const { id } = req.params;
      const transactions = await TransactionsRepository.findTransactionsById(id);
      return res.status(200).json({ transactions });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching transactions" });
    }
  }
}

module.exports = TransactionsController;
