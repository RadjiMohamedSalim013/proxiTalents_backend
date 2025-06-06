import { Response } from 'express';
import { ajouterProfilEntreprise, getAllEntreprises, updateProfilEntreprise, getEntrepriseByUserId } from '../services/entreprise/entreprise.service';
import { IUtilisateurRequest } from '../types/express/index';
import Entreprise from '../models/entreprise.model';
import { IEntrepriseCreation } from '../types/entreprise.types';

export const ajouterEntreprise = async (
  req: IUtilisateurRequest,
  res: Response
): Promise<void> => {
  try {
    const utilisateur = req.utilisateur;

    if (!utilisateur || !utilisateur._id) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    // Récupérer les autres données de l'entreprise depuis req.body
    const donneesEntreprise: IEntrepriseCreation = req.body || {};

    const nouveauProfil = await ajouterProfilEntreprise(
      utilisateur._id,
      donneesEntreprise
    );

    res.status(201).json({
      message: 'Profil entreprise créé avec succès.',
      entreprise: nouveauProfil,
    });
  } catch (erreur) {
    console.error('Erreur lors de la création du profil entreprise :', erreur);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

export const getEntreprises = async (
  req: IUtilisateurRequest,
  res: Response
): Promise<void> => {
  try {
    const entreprises = await getAllEntreprises();
    res.status(200).json(entreprises);
  } catch (erreur) {
    console.error('Erreur lors de la récupération des entreprises :', erreur);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

export const updateEntreprise = async (
  req: IUtilisateurRequest,
  res: Response
): Promise<void> => {
  try {
    const utilisateur = req.utilisateur;

    if (!utilisateur || !utilisateur._id) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    console.log('updateEntreprise utilisateur:', utilisateur);
    console.log('updateEntreprise utilisateur._id:', utilisateur._id);

    // Récupérer les données à mettre à jour depuis req.body
    const donneesMaj: Partial<IEntrepriseCreation> = req.body;

    // Vérifier si l'entreprise existe
    const entrepriseExistant = await Entreprise.findOne({ utilisateurId: utilisateur._id });
    if (!entrepriseExistant) {
      res.status(404).json({ message: 'Profil entreprise non trouvé.' });
      return;
    }

    const profilMisAJour = await updateProfilEntreprise(utilisateur._id, donneesMaj);

    res.status(200).json({
      message: 'Profil entreprise mis à jour avec succès.',
      entreprise: profilMisAJour,
    });
  } catch (erreur) {
    console.error('Erreur lors de la mise à jour du profil entreprise :', erreur);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// New controller method to get entreprise profile by user ID
export const getEntrepriseByUser = async (
  req: IUtilisateurRequest,
  res: Response
): Promise<void> => {
  try {
    const utilisateur = req.utilisateur;
    if (!utilisateur || !utilisateur._id) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }
    const entreprise = await getEntrepriseByUserId(utilisateur._id);
    if (!entreprise) {
      res.status(404).json({ message: 'Profil entreprise non trouvé.' });
      return;
    }
    res.status(200).json(entreprise);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil entreprise par utilisateur :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
