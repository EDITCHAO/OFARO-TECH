import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

// Configuration du pool de connexions PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'ofaro_tech',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  max: 20, // Nombre maximum de clients dans le pool
  idleTimeoutMillis: 30000, // Temps avant de fermer un client inactif
  connectionTimeoutMillis: 2000, // Temps d'attente pour obtenir une connexion
  ssl: process.env.DB_HOST?.includes('supabase.co') 
    ? { rejectUnauthorized: false } 
    : false, // SSL requis pour Supabase
});

// Test de connexion au démarrage
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Exécute une requête SQL
 * @param text - La requête SQL
 * @param params - Les paramètres de la requête
 * @returns Le résultat de la requête
 */
export const query = async (
  text: string,
  params?: any[]
): Promise<QueryResult> => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Query executed:', {
        text,
        duration: `${duration}ms`,
        rows: result.rowCount
      });
    }
    
    return result;
  } catch (error) {
    console.error('❌ Database query error:', error);
    throw error;
  }
};

/**
 * Exécute une transaction
 * @param callback - Fonction contenant les requêtes à exécuter
 * @returns Le résultat de la transaction
 */
export const transaction = async <T>(
  callback: (client: any) => Promise<T>
): Promise<T> => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Ferme toutes les connexions du pool
 */
export const closePool = async (): Promise<void> => {
  await pool.end();
  console.log('🔌 Database pool closed');
};

export default pool;
