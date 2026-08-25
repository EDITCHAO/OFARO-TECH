const { Router } = require('express');
const { login, getUsers, verifyToken } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', login);
router.get('/users', getUsers);
router.get('/verify', verifyToken);

module.exports = router;
