
import OffreEmploi from '../models/offreEmploi.model';
import { Types } from 'mongoose';

/**
 * Crée une nouvelle offre d'emploi.
 * @param entrepriseId - L'identifiant MongoDB de l'entreprise liée
 * @param data - Les données de l'offre (titre, description)
 * @returns Le document offre d'emploi créé
 */
export const creerOffreEmploi = async (
  entrepriseId: Types.ObjectId,
  data: { titre: string; description: string }
) => {
  const nouvelleOffre = new OffreEmploi({
    entrepriseId,
    titre: data.titre,
    description: data.description,
  });

  return await nouvelleOffre.save();
};

/**
 * Récupère toutes les offres d'emploi d'une entreprise.
 * @param entrepriseId - L'identifiant MongoDB de l'entreprise
 * @returns Liste des offres d'emploi
 */
export const getOffresParEntreprise = async (entrepriseId: Types.ObjectId) => {
  return await OffreEmploi.find({ entrepriseId }).sort({ createdAt: -1 }).exec();
};

/**
 * Récupère une offre d'emploi par son identifiant.
 * @param offreId - L'identifiant MongoDB de l'offre
 * @returns Le document offre d'emploi
 */
export const getOffreById = async (offreId: string) => {
  return await OffreEmploi.findById(offreId).exec();
};

/**
 * Met à jour une offre d'emploi existante.
 * @param offreId - L'identifiant MongoDB de l'offre
 * @param entrepriseId - L'identifiant MongoDB de l'entreprise (pour vérification)
 * @param data - Les données à mettre à jour
 * @returns Le document offre mis à jour
 */
export const updateOffreEmploi = async (
  offreId: string,
  entrepriseId: Types.ObjectId,
  data: Partial<{ titre: string; description: string }>
) => {
  const updatedOffre = await OffreEmploi.findOneAndUpdate(
    { _id: offreId, entrepriseId },
    { $set: data },
    { new: true }
  );

  return updatedOffre;
};

/**
 * Supprime une offre d'emploi.
 * @param offreId - L'identifiant MongoDB de l'offre
 * @param entrepriseId - L'identifiant MongoDB de l'entreprise (pour vérification)
 * @returns Le document offre supprimé
 */
export const deleteOffreEmploi = async (
  offreId: string,
  entrepriseId: Types.ObjectId
) => {
  const deletedOffre = await OffreEmploi.findOneAndDelete({ _id: offreId, entrepriseId });
  return deletedOffre;
};

/**
 * Récupère toutes les offres d'emploi sur la plateforme.
 * @returns Liste des offres d'emploi
 */
export const getAllOffresEmploi = async () => {
  return await OffreEmploi.find().sort({ createdAt: -1 }).exec();
};
