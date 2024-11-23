const AccService = require("./accService");

class AccController {
  static async getAccounts(req, res) {
    const { userid } = req.params;

    try {
      const data = await AccService.getAccounts(userid);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      res.status(500).json({ error: "Failed to fetch accounts." });
    }
  }

  static async createAccount(req, res) {
    const { user_id, account_name, balance } = req.body;

    try {
      const newAccount = await AccService.createAccount(user_id, account_name, balance);
      res.status(201).json(newAccount);
    } catch (error) {
      console.error("Error creating account:", error);
      res.status(500).json({ error: "Failed to create account." });
    }
  }

  static async updateAccount(req, res) {
    const { accountid } = req.params;
    const { account_name, balance } = req.body;

    try {
      const updatedAccount = await AccService.updateAccount(accountid, account_name, balance);
      res.status(200).json(updatedAccount);
    } catch (error) {
      console.error("Error updating account:", error);
      res.status(500).json({ error: "Failed to update account." });
    }
  }

  static async deleteAccount(req, res) {
    const { accountid } = req.params;

    try {
      const deletedAccount = await AccService.deleteAccount(accountid);
      if (deletedAccount) {
        res.status(200).json({ message: "Account deleted successfully." });
      } else {
        res.status(404).json({ error: "Account not found." });
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      res.status(500).json({ error: "Failed to delete account." });
    }
  }
};

module.exports = AccController;
