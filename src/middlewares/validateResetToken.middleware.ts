import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';

export const validateResetToken = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.params;

  try {
    const utilisateur = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: new Date() },
    });

    if (!utilisateur) {
      res.status(400).json({ message: 'Token invalide ou expiré.' });
      return
    }

    // On attache l'utilisateur trouvé à la requête pour l'utiliser dans le contrôleur
    (req as any).utilisateur = utilisateur;

    next();
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la validation du token.", erreur: error });
  }
};
