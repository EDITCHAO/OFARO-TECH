# ✅ Système de réponse aux messages de contact

## 🎯 Objectif
Permettre à l'admin de répondre directement aux messages de contact depuis l'interface admin, avec mise à jour automatique du statut à "Répondue".

---

## ✨ Changements appliqués

### **1. Simplification des statuts** ✅

**Avant :**
- Nouveau
- En analyse
- En cours de traitement ❌
- Traité ❌
- Sans suite ❌

**Après :**
- ✅ **Nouveau** - Message reçu, non traité
- ✅ **En analyse** - Admin en cours d'analyse
- ✅ **Répondue** - Réponse envoyée au client

---

### **2. Fonction d'envoi de réponse** ✅

**Nouvelle fonction `handleSendEmailReply` :**
```typescript
const handleSendEmailReply = async (
  messageId: string, 
  clientEmail: string, 
  clientName: string, 
  subject: string, 
  reply: string
) => {
  // 1. Envoie l'email via /api/contact/reply
  // 2. Met à jour le statut à "Répondue"
  // 3. Affiche un message de succès
  // 4. Ferme le modal
}
```

---

### **3. Modal de réponse amélioré** ✅

**Champ textarea contrôlé :**
```tsx
<textarea 
  value={emailReply}
  onChange={(e) => setEmailReply(e.target.value)}
  placeholder="Saisissez votre réponse pour le client..."
/>
```

**Bouton "Envoyer la réponse" :**
```tsx
<button 
  onClick={() => handleSendEmailReply(
    selectedItem.id, 
    selectedItem.email, 
    selectedItem.name, 
    selectedItem.subject, 
    emailReply
  )}
>
  <FaReply /> Envoyer la réponse
</button>
```

---

### **4. API d'envoi d'emails** ✅

**Nouveau endpoint : `/api/contact/reply`**

**Fichier :** `app/api/contact/reply/route.ts`

**Fonctionnalité :**
- Reçoit : `to`, `clientName`, `subject`, `reply`
- Envoie l'email depuis `contact@ofaro-tech.com`
- Format : `Re: ${subject}`
- Destinataire : Email du client

**⚠️ IMPORTANT : Service d'envoi à configurer**

Le code actuel est un placeholder. Vous devez intégrer un service d'email :

#### **Option 1 : Resend (Recommandé)**
```bash
npm install resend
```

```typescript
const { Resend } = await import('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'OFARO TECH <contact@ofaro-tech.com>',
  to: [to],
  subject: `Re: ${subject}`,
  html: `...`
});
```

**Configuration :**
1. Créer un compte sur https://resend.com
2. Ajouter `RESEND_API_KEY` dans `.env.local`
3. Vérifier le domaine `ofaro-tech.com` dans Resend

#### **Option 2 : SendGrid**
```bash
npm install @sendgrid/mail
```

#### **Option 3 : Nodemailer**
```bash
npm install nodemailer
```

---

### **5. Mise en évidence visuelle** ✅

**Messages "Nouveau" :**
- Fond orange clair `bg-orange-50`
- Barre orange à gauche `border-l-4 border-l-orange-500`
- Badge "NEW" orange vif

---

## 📋 Workflow complet

### Étape 1 : Client envoie un message
1. Client remplit le formulaire de contact
2. Message arrive dans la BDD avec `status: 'nouvelle'`
3. Apparaît dans l'admin avec statut "Nouveau" (fond orange)

### Étape 2 : Admin analyse le message
1. Admin clique sur "Lire"
2. Admin peut changer le statut à "En analyse"
3. Le fond orange disparaît

### Étape 3 : Admin répond
1. Admin tape sa réponse dans le textarea
2. Admin clique sur "Envoyer la réponse"
3. Email envoyé depuis `contact@ofaro-tech.com` vers l'email du client
4. Statut passe automatiquement à "Répondue"
5. Modal se ferme

---

## 🔧 Configuration requise

### 1. Variables d'environnement

Ajoutez dans `.env.local` :

```env
# Service d'envoi d'emails (Resend recommandé)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# OU SendGrid
# SENDGRID_API_KEY=SG.xxxxxxxxxxxxx

# OU Nodemailer SMTP
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=contact@ofaro-tech.com
# SMTP_PASS=votre_mot_de_passe
```

### 2. Installation du service d'email

```bash
# Resend (recommandé)
npm install resend

# OU SendGrid
npm install @sendgrid/mail

# OU Nodemailer
npm install nodemailer
```

### 3. Mise à jour de l'API

Éditez `app/api/contact/reply/route.ts` et décommentez la section du service choisi.

---

## 🧪 Tests

### Test 1 : Réception d'un message
1. Allez sur http://localhost:3000/contact
2. Remplissez et envoyez le formulaire
3. Allez sur http://localhost:3000/admin → "Messages de contact"
4. ✅ Le message apparaît avec statut "Nouveau"
5. ✅ Fond orange + badge "NEW"

### Test 2 : Changement de statut manuel
1. Changez le statut de "Nouveau" → "En analyse"
2. ✅ Le fond orange disparaît
3. ✅ Le badge "NEW" disparaît

### Test 3 : Réponse par email
1. Cliquez sur "Lire" sur un message
2. Tapez une réponse dans le textarea
3. Cliquez sur "Envoyer la réponse"
4. ✅ Message de succès : "Réponse envoyée à email@client.com"
5. ✅ Statut automatiquement changé à "Répondue"
6. ✅ Modal fermé
7. ✅ Email envoyé au client (vérifiez les logs pour l'instant)

### Test 4 : Filtre par statut
1. Filtrez par "Nouveau"
2. ✅ Seuls les messages "Nouveau" s'affichent
3. Filtrez par "Répondue"
4. ✅ Seuls les messages "Répondue" s'affichent

---

## 📦 Fichiers modifiés

- `app/admin/page.tsx`
  - Ajout du state `emailReply`
  - Fonction `handleSendEmailReply`
  - Simplification des statuts (filtre + select)
  - Mise en évidence visuelle des nouveaux messages
  - Modal amélioré avec textarea contrôlé
  
- `app/api/contact/reply/route.ts` ✨ NOUVEAU
  - API endpoint pour envoyer les réponses
  - À configurer avec un service d'email

---

## ⚠️ À faire

1. **Configurer un service d'envoi d'emails** (Resend recommandé)
2. **Vérifier le domaine `ofaro-tech.com`** dans le service choisi
3. **Tester l'envoi d'un vrai email**
4. **Mettre à jour la contrainte SQL** pour accepter `'repondue'` :

```sql
ALTER TABLE contact_messages DROP CONSTRAINT IF EXISTS contact_messages_status_check;
ALTER TABLE contact_messages 
ADD CONSTRAINT contact_messages_status_check 
CHECK (status IN ('nouvelle', 'en_analyse', 'repondue', 'archivee'));
```

---

## 📧 Format de l'email envoyé

**Expéditeur :** OFARO TECH <contact@ofaro-tech.com>  
**Destinataire :** Email du client  
**Sujet :** Re: [Sujet original]  
**Corps :**

```
OFARO TECH - Réponse à votre message

Bonjour [Nom du client],

[Réponse de l'admin]

---
OFARO TECH
Email: contact@ofaro-tech.com
Web: https://ofaro-tech.com
```

---

**Statut : ✅ CODE APPLIQUÉ - SERVICE EMAIL À CONFIGURER**
