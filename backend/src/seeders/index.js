const seedUsers = require('./userSeeder'); 

async function runSeeder() {
  await seedUsers();
  console.log('Seeding completed');
  process.exit();
}

runSeeder();
