# Guide de Déploiement - OFARO TECH Website

## 📋 Prérequis

- Node.js 18+ installé
- Compte Vercel, Netlify ou serveur avec Node.js
- Nom de domaine configuré (ofarotech.com)
- Certificat SSL (Let's Encrypt recommandé)

## 🚀 Déploiement sur Vercel (Recommandé)

### 1. Installation de Vercel CLI
```bash
npm install -g vercel
```

### 2. Configuration du projet
```bash
cd ofaro-tech-website
vercel login
```

### 3. Premier déploiement
```bash
vercel
```

### 4. Déploiement en production
```bash
vercel --prod
```

### 5. Configuration du domaine
Dans le dashboard Vercel :
1. Aller dans Settings > Domains
2. Ajouter ofarotech.com
3. Configurer les DNS selon les instructions

## 🌐 Déploiement sur serveur dédié

### 1. Installation des dépendances
```bash
cd ofaro-tech-website
npm install
```

### 2. Build de production
```bash
npm run build
```

### 3. Démarrage du serveur
```bash
npm start
```

### 4. Configuration Nginx (exemple)
```nginx
server {
    listen 80;
    server_name ofarotech.com www.ofarotech.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ofarotech.com www.ofarotech.com;

    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. Configuration PM2 (Process Manager)
```bash
npm install -g pm2
pm2 start npm --name "ofaro-tech" -- start
pm2 save
pm2 startup
```

## ⚙️ Variables d'environnement

Créer un fichier `.env.local` :
```env
NEXT_PUBLIC_SITE_URL=https://ofarotech.com
NEXT_PUBLIC_CONTACT_EMAIL=ofaro.tech@gmail.com
NEXT_PUBLIC_CONTACT_PHONE=+228XXXXXXXX
NEXT_PUBLIC_WHATSAPP=+228XXXXXXXX
```

## 🔒 Sécurité

### Headers de sécurité (next.config.mjs)
```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

## 📊 Monitoring

### Google Analytics
1. Créer un compte GA4
2. Ajouter l'ID dans `.env.local`
3. Installer le package :
```bash
npm install @next/third-parties
```

### Vérification du site
- Google Search Console : https://search.google.com/search-console
- PageSpeed Insights : https://pagespeed.web.dev/
- GTmetrix : https://gtmetrix.com/

## 🔄 Mise à jour

### Déploiement automatique avec Git
```bash
git add .
git commit -m "Update: description"
git push origin main
```

Vercel redéploiera automatiquement.

## 📧 Configuration Email

Pour les formulaires de contact, configurer un service SMTP :
- SendGrid
- Mailgun
- Service SMTP de votre hébergeur

## ✅ Checklist finale

- [ ] Build réussi sans erreurs
- [ ] Tests de toutes les pages
- [ ] Vérification responsive (mobile/tablet/desktop)
- [ ] SSL configuré
- [ ] DNS configurés
- [ ] Analytics installé
- [ ] Formulaires testés
- [ ] Performance > 90 (PageSpeed)
- [ ] SEO optimisé (balises meta, sitemap)
- [ ] Images optimisées
- [ ] Sauvegardes configurées

## 🆘 Support

Pour toute question ou problème :
- Email : ofaro.tech@gmail.com
- Documentation Next.js : https://nextjs.org/docs
- Documentation Vercel : https://vercel.com/docs
