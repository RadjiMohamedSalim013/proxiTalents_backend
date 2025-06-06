import { Request, Response, NextFunction } from 'express';

const rolesAutorises = ['utilisateur', 'prestataire', 'entreprise'];

export const validerInscription = (req: Request, res: Response, next: NextFunction): void => {
  const { nom, email, motDePasse, role } = req.body;

  // Vérification des champs requis (role devient optionnel)
  if (!nom || !email || !motDePasse) {
    res.status(400).json({ message: "Nom, email et mot de passe sont obligatoires." });
    return;
  }

  // Vérification du format de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Format de l’email invalide.' });
    return;
  }

  // Vérification du mot de passe (au moins 6 caractères)
  if (motDePasse.length < 6) {
    res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères.' });
    return;
  }

  // Vérification du rôle si présent
  if (role && !rolesAutorises.includes(role)) {
    res.status(400).json({ message: 'Rôle invalide.' });
    return;
  }

  // Tout est OK, on passe au middleware suivant
  next();
};
