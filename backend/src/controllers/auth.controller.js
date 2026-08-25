const jwt = require('jsonwebtoken');

const USERS = [
  {
    id: 1,
    email: 'admin@ofarotech.com',
    password: 'Admin@2025',
    firstName: 'Admin',
    lastName: 'OFARO TECH',
    role: 'administrateur',
    isActive: true,
    twoFactorEnabled: true
  },
  {
    id: 2,
    email: 'editeur@ofarotech.com',
    password: 'Editeur@2025',
    firstName: 'Kofi',
    lastName: 'Contenu',
    role: 'editeur',
    isActive: true,
    twoFactorEnabled: false
  },
  {
    id: 3,
    email: 'commercial@ofarotech.com',
    password: 'Commercial@2025',
    firstName: 'Afi',
    lastName: 'Ventes',
    role: 'commercial',
    isActive: true,
    twoFactorEnabled: false
  },
  {
    id: 4,
    email: 'rh@ofarotech.com',
    password: 'RH@2025',
    firstName: 'Mensa',
    lastName: 'Recrutement',
    role: 'rh',
    isActive: true,
    twoFactorEnabled: false
  }
];

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email et mot de passe requis'
      });
    }

    const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        error: 'Identifiants invalides'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        error: 'Compte désactivé'
      });
    }

    const jwtSecret = process.env.JWT_SECRET || 'ofaro-tech-jwt-secret-key-2026';
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: `${user.firstName} ${user.lastName}`
      },
      jwtSecret,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        twoFactorEnabled: user.twoFactorEnabled
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getUsers = async (_req, res) => {
  res.json({
    success: true,
    users: USERS.map(u => ({
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      role: u.role,
      isActive: u.isActive,
      twoFactorEnabled: u.twoFactorEnabled
    }))
  });
};

const verifyToken = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Token manquant' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const jwtSecret = process.env.JWT_SECRET || 'ofaro-tech-jwt-secret-key-2026';
    const decoded = jwt.verify(token, jwtSecret);
    res.json({ success: true, user: decoded });
  } catch (err) {
    res.status(401).json({ success: false, error: 'Token invalide ou expiré' });
  }
};

module.exports = {
  login,
  getUsers,
  verifyToken,
  USERS
};
