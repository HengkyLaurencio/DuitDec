const db = require('../../config/database');

class UserModel {

  static async getAllUsers() {
    const query =
      "SELECT id, username, email, created_at, updated_at FROM users";
    const result = await db.query(query);
    return result.rows;
  }

  static async getUserById(id) {
    const query =
      "SELECT id, username, email, password, created_at, updated_at FROM users WHERE id = $1";
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async createUser(username, email, password) {
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at, updated_at
    `;
    const result = await db.query(query, [username, email, password]);
    return result.rows[0];
  }

  static async updateUser(id, username, email) {
    const query = `
      UPDATE users
      SET username = $2, email = $3, updated_at = NOW()
      WHERE id = $1
      RETURNING id, username, email, created_at, updated_at
    `;
    const result = await db.query(query, [id, username, email]);
    return result.rows[0];
  }

  static async deleteUser(id) {
    const query = "DELETE FROM users WHERE id = $1 RETURNING id";
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = UserModel;
