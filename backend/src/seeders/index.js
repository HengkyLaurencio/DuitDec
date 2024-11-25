const seedUsers = require('./userSeeder'); 
const seedCategories = require('./categorySeeder'); 

async function runSeeder() {
  await seedUsers();
  await seedCategories();
  console.log('Seeding completed');
  process.exit();
}

runSeeder();
