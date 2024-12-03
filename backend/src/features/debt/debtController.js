const DebtService = require('./debtService');

class DebtController {
  static async getAllDebts(req, res) {
    try {
      const debts = await DebtService.getAllDebts();
      res.status(200).json(debts);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving debts', error });
    }
  }

  static async getDebtById(req, res) {
    try {
      const { id } = req.params;
      const debt = await DebtService.getDebtById(id);
      if (!debt) {
        return res.status(404).json({ message: 'Debt not found' });
      }
      res.status(200).json(debt);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving debt', error });
    }
  }

  static async createDebt(req, res) {
    try {
      const debtData = req.body;
      const newDebt = await DebtService.createDebt(debtData);
      res.status(201).json(newDebt);
    } catch (error) {
      res.status(500).json({ message: 'Error creating debt', error });
    }
  }

  static async updateDebt(req, res) {
    try {
      const { id } = req.params;
      const debtData = req.body;
      const updatedDebt = await DebtService.updateDebt(id, debtData);
      if (!updatedDebt) {
        return res.status(404).json({ message: 'Debt not found' });
      }
      res.status(200).json(updatedDebt);
    } catch (error) {
      res.status(500).json({ message: 'Error updating debt', error });
    }
  }

  static async deleteDebt(req, res) {
    try {
      const { id } = req.params;
      const deletedDebt = await DebtService.deleteDebt(id);
      if (!deletedDebt) {
        return res.status(404).json({ message: 'Debt not found' });
      }
      res.status(200).json({ message: 'Debt deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting debt', error });
    }
  }
}

module.exports = DebtController;
