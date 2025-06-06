import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Express } from '../types/express';
import { IUser } from '../models/user.model';

export const verifierToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
     res.status(401).json({ message: 'Token manquant' });
     return
  }

  try {
    console.log('Token reçu dans verifierToken:', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    console.log('Token décodé dans verifierToken:', decoded);

    // Vérifie que le payload est un objet
    if (typeof decoded === 'string') {
       res.status(403).json({ message: 'Token invalide (payload incorrect)' });
       return
    }

    // Typage explicite du payload comme IUser (si tu as stocké les infos de l'utilisateur dans le JWT)
    (req as Express.Request).utilisateur = decoded as IUser;

    next();
  } catch (error) {
     console.error('Erreur dans verifierToken:', error);
     res.status(403).json({ message: 'Token invalide' });
     return
  }
};
