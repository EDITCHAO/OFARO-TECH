# 🔧 Résolution des erreurs 404 en local

## ❌ Erreurs rencontrées :

```
404 (Not Found): /_next/static/chunks/main-app.js
404 (Not Found): /_next/static/chunks/app/page.js
404 (Not Found): /_next/static/chunks/app-pages-internals.js
404 (Not Found): layout.css
500 (Internal Server Error): manifest.webmanifest
```

---

## ✅ SOLUTION RAPIDE

### **Double-cliquez sur ce fichier :**

📄 **`clean-and-restart.bat`**

Cela va :
1. ✅ Arrêter tous les serveurs Node.js
2. ✅ Supprimer le cache `.next`
3. ✅ Supprimer le cache `node_modules/.cache`
4. ✅ Réinstaller les dépendances
5. ✅ Redémarrer le serveur proprement

---

## 🛠️ SOLUTION MANUELLE

Si le script ne fonctionne pas, ouvrez PowerShell et exécutez :

```powershell
# 1. Naviguer vers le projet
cd "c:\PROJET\OFARO TECH\ofaro-tech-website"

# 2. Arrêter tous les serveurs Node
taskkill /F /IM node.exe

# 3. Supprimer le cache
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules\.cache

# 4. Réinstaller les dépendances
npm install

# 5. Redémarrer
npm run dev
```

---

## 🔍 CAUSE DU PROBLÈME

Ces erreurs 404 sont causées par :

1. **Cache corrompu** : Le dossier `.next` contient des fichiers obsolètes
2. **Serveurs multiples** : Plusieurs instances de `npm run dev` tournaient
3. **Build incomplet** : Le serveur a démarré avant la fin de la compilation

---

## ✅ APRÈS LE REDÉMARRAGE

Le site sera accessible à :

- **Sur votre PC** : http://localhost:3000
- **Sur mobile/autre PC** : http://192.168.1.71:3000

Vous devriez voir :
```
✓ Ready in 15s
```

---

## 📝 POUR ÉVITER CE PROBLÈME À L'AVENIR

### **Toujours arrêter proprement le serveur**

Utilisez **Ctrl + C** dans le terminal pour arrêter le serveur.

❌ **Ne pas** : Fermer la fenêtre PowerShell directement  
✅ **Faire** : Appuyer sur Ctrl+C puis fermer

### **Nettoyer régulièrement**

Si vous modifiez beaucoup de fichiers :

```bash
npm run dev
# Arrêter avec Ctrl+C

# Nettoyer
Remove-Item -Recurse -Force .next

# Redémarrer
npm run dev
```

---

## 🚀 DÉPLOIEMENT SUR VERCEL

Ces erreurs 404 sont **uniquement en local**. Elles n'affectent **PAS** Vercel.

Sur Vercel, le build se fait proprement à chaque déploiement, donc pas de cache corrompu !

Pour déployer sur Vercel :
1. Poussez vos corrections sur GitHub
2. Vercel redéploiera automatiquement
3. Le build sera clean et sans erreur

---

## ⚠️ SI LE PROBLÈME PERSISTE

### **Option nucléaire : Tout réinstaller**

```powershell
cd "c:\PROJET\OFARO TECH\ofaro-tech-website"

# Supprimer TOUT
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .next
Remove-Item -Force package-lock.json

# Réinstaller from scratch
npm install

# Redémarrer
npm run dev
```

Cette méthode prend 5-10 minutes mais résout tous les problèmes de cache.

---

## 🆘 BESOIN D'AIDE ?

Si les erreurs persistent même après le nettoyage :

1. **Vérifiez votre version Node.js** :
   ```bash
   node --version
   ```
   Doit être >= 18.0.0

2. **Vérifiez que le port 3000 n'est pas utilisé** :
   ```bash
   netstat -ano | findstr :3000
   ```

3. **Essayez un autre port** :
   ```bash
   npm run dev -- -p 3001
   ```

---

**Date** : Décembre 2024  
**Projet** : OFARO TECH Website  
**Version Next.js** : 14.2.35
