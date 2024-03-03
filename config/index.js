require("dotenv").config();

const dbURL = process.env.DATABASE_URL;
const jwtKey = process.env.JWT_SECRET;
const refreshJwtKey = process.env.REFRESH_TOKEN;
const stripeKey = process.env.STRIPE_SECRET;

module.exports = { dbURL, jwtKey, refreshJwtKey, stripeKey };
