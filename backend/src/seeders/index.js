const seedUsers = require('./userSeeder'); 
const seedCategories = require('./categorySeeder'); 
const seedDemo = require('./demoSeeder');

async function runSeeder() {
  await seedCategories();
  await seedUsers();
  await seedDemo();
  console.log('Seeding completed');
  process.exit();
}

runSeeder();
