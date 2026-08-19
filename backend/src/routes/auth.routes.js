const { Router } = require('express');

const router = Router();

router.post('/login', (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Authentification non implémentée - Phase 2'
  });
});

module.exports = router;
