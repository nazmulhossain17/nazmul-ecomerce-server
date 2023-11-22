require("dotenv").config();

const dbURL = process.env.DATABASE_URL;

module.exports = { dbURL };
