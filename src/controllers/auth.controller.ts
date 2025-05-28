import { Request, Response, NextFunction  } from 'express';
import crypto from 'crypto';
import { registerUserService } from '../services/auth/registerUser.service';
import { loginUserService } from '../services/auth/loginUser.service';
import { User } from '../models/user.model';
import { envoyerEmailReinitialisation } from '../services/auth/email.service';
import bcrypt from 'bcryptjs';
import { resetPasswordService } from '../services/auth/resetPassword.service';
import { changerMotDePasse } from '../services/auth/changePassword.service';


// inscription 
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await registerUserService(req.body);
    res.status(201).json({ message: 'Utilisateur inscrit avec succès' });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Erreur lors de l\'inscription' });
  }
};


// connexion
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, motDePasse } = req.body;

    const result = await loginUserService(email, motDePasse);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

// mot de passe oublier
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      res.status(404).json({ message: "Aucun utilisateur trouvé avec cet email" })
      return
    }

    //Génération d'un token 
    const token = crypto.randomBytes(32).toString('hex');

    user.resetToken = token;
    user.resetTokenExpiration = new Date(Date.now() + 3600000);

    await user.save()

    // Envoi de l'email avec le lien de réinitialisation
    await envoyerEmailReinitialisation(email, token);
    res.status(200).json({ message: "Lien de réinitialisation envoyé par email." });


  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la demande de réinitialisation.", erreur: error });
  }
}



// réinitialisation du mot de passe
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nouveauMotDePasse } = req.body;
    const utilisateur = (req as any).utilisateur;

    await resetPasswordService(utilisateur, nouveauMotDePasse);

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la réinitialisation du mot de passe.", erreur: error });
  }
};


//changer mot de passe
export const changerMotDePasseController = async (req: Request, res: Response) => {
  const { email, ancienMotDePasse, nouveauMotDePasse } = req.body;

  try {
    const result = await changerMotDePasse(email, ancienMotDePasse, nouveauMotDePasse);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

