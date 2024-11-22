const bcrypt = require('bcrypt');
const db = require('../config/database');

async function seedUsers() {
  const hashedPassword1 = await bcrypt.hash('password123', 10);
  const hashedPassword2 = await bcrypt.hash('securepassword456', 10);

  const users = [
    {
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: hashedPassword1,
    },
    {
      username: 'jane_doe',
      email: 'jane.doe@example.com',
      password: hashedPassword2,
    },
  ];

  try {
    for (const user of users) {
      const query = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING user_id, username, email, created_at, updated_at
      `;
      const result = await db.query(query, [user.username, user.email, user.password]);
      console.log('User seeded:', result.rows[0]);
    }
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

module.exports = seedUsers;
