require("dotenv").config();

const dbURL = process.env.DATABASE_URL;
const jwtKey = process.env.JWT_SECRET;

module.exports = { dbURL, jwtKey };
