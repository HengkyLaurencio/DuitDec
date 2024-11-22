const db = require("../../config/database");

class AuthModel {
    static async getUserByEmail(email){
        const query = "SELECT * FROM users WHERE email = $1";
        const result = await db.query(query, [email]);
        console.log(result.rows[0]);
        return result.rows[0];
    }
    
}
module.exports = AuthModel;