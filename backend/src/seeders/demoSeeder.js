const db = require('../config/database');
const bcrypt = require('bcrypt');

async function seedDemoData() {
    try {
        await db.query('BEGIN'); // Start transaction


        // Hash the password
        const hashedPassword = await bcrypt.hash('demo123', 10);

        // Insert one user with hashed password
        const userQuery = `
      INSERT INTO users (username, email, password, image)
      VALUES ('demoUser', 'demo@user.com', $1, 'default.jpg')
      RETURNING user_id
    `;
        const userResult = await db.query(userQuery, [hashedPassword]);
        const userId = userResult.rows[0].user_id;

        // Insert transactions (many entries)
        const transactionQuery = `
      INSERT INTO transactions (user_id, transaction_type, category_id, amount, notes, date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING transaction_id
    `;

        // Insert multiple transactions
        const transactions = [
            ['income', 1, 1000, 'Salary', '2024-12-01'],
            ['outcome', 2, 200, 'Harry Potter', '2024-12-02'],
            ['outcome', 3, 150, 'Purchase of tools', '2024-12-03'],
            ['income', 1, 500, 'Freelance work', '2024-12-04'],
        ];

        for (const [type, categoryId, amount, notes, date] of transactions) {
            await db.query(transactionQuery, [userId, type, categoryId, amount, notes, date]);
        }

        // Insert accounts (many entries)
        const accountQuery = `
      INSERT INTO accounts (user_id, account_name, balance)
      VALUES ($1, $2, $3)
      RETURNING account_id
    `;

        const accounts = [
            ['Savings', 2000],
            ['Checking', 500],
        ];

        for (const [accountName, balance] of accounts) {
            await db.query(accountQuery, [userId, accountName, balance]);
        }

        // Insert credit cards (many entries)
        const creditCardQuery = `
    INSERT INTO credit_cards (user_id, card_name, "limit", card_residual, amount, due_date, percentage)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING card_id    
    `;

        const creditCards = [
            ['Visa', 5000, 4500, 1000, '2024-12-10', 0.03],
            ['MasterCard', 3000, 2500, 500, '2024-12-15', 0.02],
        ];

        for (const [cardName, limit, cardResidual, amount, dueDate, percentage] of creditCards) {
            await db.query(creditCardQuery, [userId, cardName, limit, cardResidual, amount, dueDate, percentage]);
        }

        // Insert debts (many entries)
        const debtQuery = `
      INSERT INTO debts (name, debt_type, amount, debt_residual, date_start, date_end, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING debt_id
    `;

        const debts = [
            ['Car loan', 'debt', 10000, 8000, '2024-01-01', '2024-12-31', userId],
            ['Student loan', 'debt', 5000, 4500, '2024-02-01', '2025-02-01', userId],
        ];

        for (const [name, debtType, amount, debtResidual, dateStart, dateEnd, userId] of debts) {
            await db.query(debtQuery, [name, debtType, amount, debtResidual, dateStart, dateEnd, userId]);
        }

        // Insert budgets (many entries)
        const budgetQuery = `
      INSERT INTO budgets (user_id, category_id, period, start_date, budget_amout, used_amout)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING budget_id
    `;

        const budgets = [
            [userId, 1, 'monthly', '2024-12-01', 500, 200],
            [userId, 3, 'monthly', '2024-12-01', 300, 100],
        ];

        for (const [userId, categoryId, period, startDate, budgetAmount, usedAmount] of budgets) {
            await db.query(budgetQuery, [userId, categoryId, period, startDate, budgetAmount, usedAmount]);
        }

        await db.query('COMMIT'); // Commit transaction
        console.log('Demo data seeded successfully!');
    } catch (error) {
        await db.query('ROLLBACK'); // Rollback transaction if error occurs
        console.error('Error seeding demo data:', error);
    }
}

module.exports = seedDemoData;
