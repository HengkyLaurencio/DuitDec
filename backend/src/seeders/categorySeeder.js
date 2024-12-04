const db = require('../config/database');

async function seedCategories() {
  const categories = [
    { category_name: 'Books', category_icon: 'menu_book' },
    { category_name: 'Tools', category_icon: 'construction' },
    { category_name: 'Electronics', category_icon: 'devices' },
    { category_name: 'Furniture', category_icon: 'chair' },
    { category_name: 'Clothing', category_icon: 'checkroom' },
    { category_name: 'Groceries', category_icon: 'shopping_cart' },
    { category_name: 'Health', category_icon: 'local_hospital' },
    { category_name: 'Entertainment', category_icon: 'movie' },
    { category_name: 'Transportation', category_icon: 'directions_car' },
    { category_name: 'Education', category_icon: 'school' },
    { category_name: 'Sports', category_icon: 'sports_soccer' },
    { category_name: 'Travel', category_icon: 'flight_takeoff' },
    { category_name: 'Food', category_icon: 'restaurant' },
    { category_name: 'Finance', category_icon: 'account_balance' },
    { category_name: 'Pets', category_icon: 'pets' },
    { category_name: 'Gardening', category_icon: 'yard' },
    { category_name: 'Beauty', category_icon: 'spa' },
    { category_name: 'Baby Care', category_icon: 'child_friendly' },
    { category_name: 'Gifts', category_icon: 'redeem' },
    { category_name: 'Music', category_icon: 'music_note' },
  ];

  try {
    await db.query('BEGIN'); // Start transaction
    for (const category of categories) {
      const query = `
        INSERT INTO categories (category_name, category_icon)
        VALUES ($1, $2)
        RETURNING category_id, category_name, category_icon
      `;
      
      const result = await db.query(query, [
        category.category_name,
        category.category_icon,
      ]);
      
      console.log('Category seeded:', result.rows[0]);
    }
    await db.query('COMMIT'); // Commit transaction
  } catch (error) {
    await db.query('ROLLBACK'); // Rollback transaction if error
    console.error('Error seeding categories:', error);
  }
}

module.exports = seedCategories;
