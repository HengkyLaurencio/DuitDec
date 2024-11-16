const dotenv = require("dotenv");
process.env.NODE_ENV = (process.env.NODE_ENV || "development").toLowerCase();

const envFound = dotenv.config({ path: ".env" });
if (envFound.error) {
  throw new Error("⚠️ Couldn't find .env file ⚠️");
}

module.exports = {
    user: process.env.USER,
    port: process.env.PORT,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
};