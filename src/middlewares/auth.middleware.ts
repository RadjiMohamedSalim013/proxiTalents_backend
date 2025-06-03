// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { IUser } from '../models/user.model';

const SECRET_KEY = process.env.JWT_SECRET || 'votre_secret';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
     res.status(401).json({ message: 'Token manquant ou invalide.' });
     return
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };

    const utilisateur = await User.findById(decoded.id).select('-motDePasse');
    if (!utilisateur) {
       res.status(401).json({ message: 'Utilisateur non trouvé.' });
       return
    }

    // @ts-expect-error - Nous savons que nous avons étendu le type dans src/types/express
    req.utilisateur = utilisateur;


    next();
  } catch (err) {
     res.status(401).json({ message: 'Token invalide.', erreur: err });
     return
  }
};
