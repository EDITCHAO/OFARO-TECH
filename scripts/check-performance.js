#!/usr/bin/env node

/**
 * Script simple pour vérifier les temps de chargement
 * Usage: node scripts/check-performance.js
 */

const https = require('https');
const http = require('http');

const URL = 'http://localhost:3000';

console.log('🔍 Vérification des performances du site OFARO TECH...\n');

function checkEndpoint(path = '/') {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    http.get(URL + path, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        resolve({
          path,
          statusCode: res.statusCode,
          duration,
          size: Buffer.byteLength(data, 'utf8'),
        });
      });
    }).on('error', (err) => {
      resolve({
        path,
        error: err.message,
      });
    });
  });
}

async function runTests() {
  const pages = [
    '/',
    '/a-propos',
    '/services',
    '/realisations',
    '/secteurs',
    '/contact',
    '/devis',
  ];

  console.log('📊 Test de chargement des pages principales:\n');

  for (const page of pages) {
    const result = await checkEndpoint(page);
    
    if (result.error) {
      console.log(`❌ ${page.padEnd(20)} - Erreur: ${result.error}`);
    } else {
      const status = result.statusCode === 200 ? '✅' : '⚠️';
      const time = result.duration + 'ms';
      const size = (result.size / 1024).toFixed(2) + ' KB';
      
      console.log(`${status} ${page.padEnd(20)} ${time.padStart(8)} | ${size.padStart(10)}`);
    }
  }

  console.log('\n📝 Recommandations:');
  console.log('  • Temps < 1000ms = Excellent ✅');
  console.log('  • Temps 1000-2000ms = Bon ⚡');
  console.log('  • Temps > 2000ms = À améliorer 🔧');
  console.log('\n💡 Pour des tests plus détaillés, utilisez:');
  console.log('  • Chrome DevTools > Lighthouse');
  console.log('  • https://www.webpagetest.org/');
}

runTests().catch(console.error);
