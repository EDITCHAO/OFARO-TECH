import { Router } from 'express';

const router = Router();

// TODO: Phase 2 - Authentification
// POST /api/auth/login - Connexion administrateur
// POST /api/auth/logout - Déconnexion
// GET /api/auth/me - Utilisateur connecté
// POST /api/auth/refresh - Renouveler le token

// Placeholder pour éviter les erreurs
router.post('/login', (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Authentification non implémentée - Phase 2'
  });
});

export default router;
