require('dotenv').config();

const { Pool } = require('pg');
const productionVar = process.env.NODE_ENV === 'production'

const connection = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: productionVar ? process.env.DATABASE_URL : connection,
  ssl: productionVar,
})

module.exports = { pool }