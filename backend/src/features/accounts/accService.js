const AccRepository = require("./accRepository");

class AccService {
  static async getAccounts(userId) {
    return await AccRepository.getAccountsByUserId(userId);
  }

  static async createAccount(userId, accountName, balance) {
    return await AccRepository.createAccount(userId, accountName, balance);
  }

  static async updateAccount(accountId, accountName, balance) {
    return await AccRepository.updateAccount(
      accountId,
      accountName,
      balance
    );
  }

  static async deleteAccount(accountId) {
    return await AccRepository.deleteAccount(accountId);
  }
  
};

module.exports = AccService;
