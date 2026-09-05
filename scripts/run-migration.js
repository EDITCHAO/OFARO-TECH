/**
 * Script pour exécuter la migration des contraintes de statuts
 * Usage: node scripts/run-migration.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Charger les variables d'environnement
require('dotenv').config({ path: '.env.local' });

async function runMigration() {
  console.log('🚀 Démarrage de la migration...\n');

  // Créer le client Supabase avec la clé service role
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Lire le fichier de migration
  const migrationPath = path.join(__dirname, '../database/migrations/update_status_constraints.sql');
  const sqlContent = fs.readFileSync(migrationPath, 'utf8');

  console.log('📝 Contenu de la migration chargé\n');

  // Diviser les commandes SQL (par point-virgule)
  const sqlCommands = sqlContent
    .split(';')
    .map(cmd => cmd.trim())
    .filter(cmd => cmd && !cmd.startsWith('--') && cmd !== '');

  console.log(`📋 Nombre de commandes SQL à exécuter: ${sqlCommands.length}\n`);

  // Exécuter chaque commande
  for (let i = 0; i < sqlCommands.length; i++) {
    const command = sqlCommands[i];
    
    // Afficher un résumé de la commande
    const firstLine = command.split('\n')[0].substring(0, 60);
    console.log(`⏳ Exécution [${i + 1}/${sqlCommands.length}]: ${firstLine}...`);

    try {
      const { error } = await supabase.rpc('exec_sql', { sql_query: command });
      
      if (error) {
        // Certaines erreurs peuvent être ignorées (ex: constraint déjà supprimée)
        if (error.message.includes('does not exist')) {
          console.log(`   ⚠️  Avertissement: ${error.message}`);
        } else {
          throw error;
        }
      } else {
        console.log(`   ✅ Succès\n`);
      }
    } catch (err) {
      console.error(`   ❌ Erreur: ${err.message}\n`);
      console.error('⚠️  Note: Vous devrez peut-être exécuter cette migration manuellement dans l\'éditeur SQL de Supabase.\n');
      console.log('📋 Commande SQL à exécuter:');
      console.log(command);
      console.log('\n');
    }
  }

  console.log('\n✨ Migration terminée!\n');
  console.log('🔍 Vérifiez que les statuts sont maintenant acceptés dans l\'interface admin.\n');
}

runMigration().catch(console.error);
