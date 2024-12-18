const UserModel = require('./userRepository');
const bcrypt = require('bcrypt');

class UserService {
  static async getAllUsers() {
    return UserModel.getAllUsers();
  }

  static async getUserById(id) {
    return UserModel.getUserById(id);
  }

  static async createUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10); 
    return UserModel.createUser(username, email, hashedPassword);
  }

  static async updateUser(id, username, email, image) {
    return UserModel.updateUser(id, username, email, image);
  }

  static async deleteUser(id) {
    return UserModel.deleteUser(id);
  }
}

module.exports = UserService;
