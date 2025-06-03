import { Request, Response } from 'express';
import { ajouterProfilPrestataire } from '../services/prestataire/prestataire.service';
import { IUtilisateurRequest } from '../types/express/index';
import type{ IPrestataireCreation } from '../types/prestataire.type';

export const ajouterPrestataire = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const utilisateur = (req as IUtilisateurRequest).utilisateur;

    if (!utilisateur || !utilisateur._id) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const donneesPrestataire: IPrestataireCreation = req.body;

    const nouveauProfil = await ajouterProfilPrestataire(
      utilisateur._id,
      donneesPrestataire
    );

    res.status(201).json({
      message: 'Profil prestataire créé avec succès.',
      prestataire: nouveauProfil,
    });
  } catch (erreur) {
    console.error('Erreur lors de la création du profil prestataire :', erreur);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
