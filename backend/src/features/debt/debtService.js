const DebtRepository = require('./debtRepository');

class DebtService {
  static async getAllDebts() {
    return DebtRepository.getAllDebts();
  }

  static async getDebtById(debtId) {
    return DebtRepository.getDebtById(debtId);
  }

  static async createDebt(debtData) {
    return DebtRepository.createDebt(debtData);
  }

  static async updateDebt(debtId, debtData) {
    return DebtRepository.updateDebt(debtId, debtData);
  }

  static async deleteDebt(debtId) {
    return DebtRepository.deleteDebt(debtId);
  }
}

module.exports = DebtService;
