// Test rapide de connexion à Supabase
const { Pool } = require('pg');
require('dotenv').config();

async function testConnection() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: { rejectUnauthorized: false }
  });

  console.log('🔧 Configuration:');
  console.log('  Host:', process.env.DB_HOST);
  console.log('  Port:', process.env.DB_PORT);
  console.log('  Database:', process.env.DB_NAME);
  console.log('  User:', process.env.DB_USER);
  console.log('  Password:', process.env.DB_PASSWORD ? `${process.env.DB_PASSWORD.substring(0, 3)}***` : 'NOT SET');
  console.log('');
  console.log('⏳ Connexion en cours...');

  try {
    const res = await pool.query('SELECT version(), current_database()');
    console.log('✅ Connexion réussie!');
    console.log('PostgreSQL version:', res.rows[0].version.substring(0, 50) + '...');
    console.log('Database:', res.rows[0].current_database);
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur de connexion:', err.message);
    console.error('Code:', err.code);
    await pool.end();
    process.exit(1);
  }
}

testConnection();
