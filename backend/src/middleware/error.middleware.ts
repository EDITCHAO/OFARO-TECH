import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message
    });
  }

  // Erreur PostgreSQL
  if ('code' in err) {
    const pgError = err as any;
    
    // Violation de contrainte unique
    if (pgError.code === '23505') {
      return res.status(409).json({
        success: false,
        error: 'Cette ressource existe déjà'
      });
    }
    
    // Violation de clé étrangère
    if (pgError.code === '23503') {
      return res.status(400).json({
        success: false,
        error: 'Référence invalide'
      });
    }
  }

  // Erreur de validation
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  // Erreur JWT
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

  // Log l'erreur en développement
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Error:', err);
  }

  // Erreur générique
  return res.status(500).json({
    success: false,
    error: 'Une erreur interne est survenue'
  });
};
