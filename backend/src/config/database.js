const { Pool } = require("pg");
const data = require("./env.js");

const pool = new Pool({
  user: data.user,
  host: data.host,
  database: data.database,
  password: data.password,
  port: data.port,
  secret: data.secret
});

module.exports = pool;
