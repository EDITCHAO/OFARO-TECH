// Script de test de connexion à la base de données
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function testConnection() {
  console.log('========================================');
  console.log('  TEST DE CONNEXION À LA BASE DE DONNÉES');
  console.log('========================================\n');

  console.log('Configuration :');
  console.log(`  Host: ${process.env.DB_HOST}`);
  console.log(`  Port: ${process.env.DB_PORT}`);
  console.log(`  Database: ${process.env.DB_NAME}`);
  console.log(`  User: ${process.env.DB_USER}`);
  console.log('');

  try {
    console.log('Tentative de connexion...');
    const client = await pool.connect();
    console.log('✓ Connexion réussie !\n');

    // Test de requête simple
    console.log('Test de requête...');
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✓ Requête réussie !\n');

    console.log('Informations PostgreSQL :');
    console.log(`  Heure serveur: ${result.rows[0].current_time}`);
    console.log(`  Version: ${result.rows[0].pg_version.split(',')[0]}\n`);

    // Vérifier si la table service_requests existe
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'service_requests'
      );
    `);

    if (tableCheck.rows[0].exists) {
      console.log('✓ Table service_requests : EXISTE');
      
      // Compter les demandes
      const countResult = await client.query('SELECT COUNT(*) as total FROM service_requests');
      console.log(`  Nombre de demandes : ${countResult.rows[0].total}\n`);
    } else {
      console.log('✗ Table service_requests : N\'EXISTE PAS');
      console.log('  → Vous devez exécuter le schéma SQL !\n');
    }

    // Vérifier les autres tables
    const tables = ['contacts', 'request_history', 'users'];
    console.log('Vérification des tables :');
    
    for (const tableName of tables) {
      const check = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = $1
        );
      `, [tableName]);
      
      const exists = check.rows[0].exists;
      console.log(`  ${exists ? '✓' : '✗'} ${tableName}`);
    }

    client.release();

    console.log('\n========================================');
    console.log('  TEST TERMINÉ AVEC SUCCÈS !');
    console.log('========================================');

  } catch (error) {
    console.error('\n✗ ERREUR DE CONNEXION :');
    console.error(`  ${error.message}\n`);
    
    if (error.code === 'ENOTFOUND') {
      console.log('Suggestions :');
      console.log('  - Vérifiez votre connexion internet');
      console.log('  - Vérifiez que DB_HOST est correct dans .env.local');
    } else if (error.code === '28P01') {
      console.log('Suggestions :');
      console.log('  - Vérifiez DB_USER et DB_PASSWORD dans .env.local');
    }
  } finally {
    await pool.end();
  }
}

testConnection();
