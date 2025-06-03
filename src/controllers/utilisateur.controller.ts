import { Request, Response } from 'express';
import { Express } from '../types/express/index';
import { recupererProfilUtilisateur } from '../services/utilisateur/utilisateur.service';

export const recupererProfil = (req: Request, res: Response) => {
  const utilisateur = (req as Express.Request).utilisateur;
  console.log(utilisateur)
  if (!utilisateur) {
    res.status(401).json({ message: 'Utilisateur non authentifié.' });
    return
  }
  res.json({ utilisateur });
  return
};