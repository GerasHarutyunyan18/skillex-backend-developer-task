const dotenv = require("dotenv");

dotenv.config();

const config = {
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
  },
  port: process.env.PORT || 3000,
};

module.exports = config;
