const db = require('../config/database');

async function seedCategories() {
  const categories = [
    {
        category_id: '1',
        category_name:'book'
    },
    {
        category_id: '2',
        category_name:'tools'
    },
    
  ];

  try {
    for (const category of categories) {
      const query = `
        INSERT INTO categories (category_id, category_name)
        VALUES ($1, $2)
        RETURNING category_id, category_name
      `;
      
      const result = await db.query(query, [
        category.category_id,
        category.category_name,
      ]);
      
      console.log('Category seeded:', result.rows[0]);
    }
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
}

module.exports = seedCategories;