
import { Response } from 'express';
import { Types } from 'mongoose';
import {
  creerOffreEmploi,
  getOffresParEntreprise,
  updateOffreEmploi,
  deleteOffreEmploi,
  getOffreById,
  getAllOffresEmploi,
} from '../services/offreEmploi.service';
import { IUtilisateurRequest } from '../types/express/index';

export const ajouterOffre = async (
  req: IUtilisateurRequest,
  res: Response
): Promise<void> => {
  try {
    const utilisateur = req.utilisateur;

    if (!utilisateur || !utilisateur._id) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const { titre, description } = req.body;

    if (!titre || !description) {
      res.status(400).json({ message: 'Titre et description sont requis.' });
      return;
    }

    const nouvelleOffre = await creerOffreEmploi(new Types.ObjectId(utilisateur._id), {
      titre,
      description,
    });

    res.status(201).json({
      message: 'Offre d\'emploi créée avec succès.',
      offre: nouvelleOffre,
    });
  } catch (erreur) {
    console.error('Erreur lors de la création de l\'offre :', erreur);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

export const getOffresEntreprise = async (
  req: IUtilisateurRequest,
  res: Response
): Promise<void> => {
  try {
    const utilisateur = req.utilisateur;

    if (!utilisateur || !utilisateur._id) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const offres = await getOffresParEntreprise(new Types.ObjectId(utilisateur._id));
    res.status(200).json(offres);
  } catch (erreur) {
    console.error('Erreur lors de la récupération des offres :', erreur);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

export const getOffreByIdController = async (
  req: IUtilisateurRequest,
  res: Response
): Promise<void> => {
  try {
    const offreId = req.params.id;

    const offre = await getOffreById(offreId);

    if (!offre) {
      res.status(404).json({ message: 'Offre non trouvée.' });
      return;
    }

    res.status(200).json(offre);
  } catch (erreur) {
    console.error('Erreur lors de la récupération de l\'offre :', erreur);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

export const updateOffre = async (
  req: IUtilisateurRequest,
  res: Response
): Promise<void> => {
  try {
    const utilisateur = req.utilisateur;
    const offreId = req.params.id;

    if (!utilisateur || !utilisateur._id) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const { titre, description } = req.body;

    const offreMaj = await updateOffreEmploi(
      offreId,
      new Types.ObjectId(utilisateur._id),
      { titre, description }
    );

    if (!offreMaj) {
      res.status(404).json({ message: 'Offre non trouvée ou non autorisée.' });
      return;
    }

    res.status(200).json({
      message: 'Offre mise à jour avec succès.',
      offre: offreMaj,
    });
  } catch (erreur) {
    console.error('Erreur lors de la mise à jour de l\'offre :', erreur);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

export const deleteOffre = async (
  req: IUtilisateurRequest,
  res: Response
): Promise<void> => {
  try {
    const utilisateur = req.utilisateur;
    const offreId = req.params.id;

    if (!utilisateur || !utilisateur._id) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const offreSupprimee = await deleteOffreEmploi(
      offreId,
      new Types.ObjectId(utilisateur._id)
    );

    if (!offreSupprimee) {
      res.status(404).json({ message: 'Offre non trouvée ou non autorisée.' });
      return;
    }

    res.status(200).json({
      message: 'Offre supprimée avec succès.',
      offre: offreSupprimee,
    });
  } catch (erreur) {
    console.error('Erreur lors de la suppression de l\'offre :', erreur);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// New controller method to get all offers
export const getAllOffres = async (
  req: IUtilisateurRequest,
  res: Response
): Promise<void> => {
  try {
    const offres = await getAllOffresEmploi();
    res.status(200).json(offres);
  } catch (erreur) {
    console.error('Erreur lors de la récupération de toutes les offres :', erreur);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
