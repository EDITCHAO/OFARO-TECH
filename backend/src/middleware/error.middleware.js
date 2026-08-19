class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const errorHandler = (err, req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message
    });
  }

  if (err && err.code) {
    if (err.code === '23505') {
      return res.status(409).json({
        success: false,
        error: 'Cette ressource existe déjà'
      });
    }

    if (err.code === '23503') {
      return res.status(400).json({
        success: false,
        error: 'Référence invalide'
      });
    }
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Token invalide'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Token expiré'
    });
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  return res.status(500).json({
    success: false,
    error: 'Une erreur interne est survenue'
  });
};

module.exports = {
  AppError,
  errorHandler
};
