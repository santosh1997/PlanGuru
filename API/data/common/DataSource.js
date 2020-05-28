const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const DataSource = (() => {
  const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    }),
    getConnection = async () => {
      try {
        const connection = await pool.connect();
        return connection;
      } catch (error) {
        throw error;
      }
    };
  return {
    GetConnection: getConnection,
  };
})();

module.exports = DataSource;
