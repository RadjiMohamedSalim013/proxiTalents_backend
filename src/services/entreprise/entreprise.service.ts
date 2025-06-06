import Entreprise from '../../models/entreprise.model';
import { Types } from 'mongoose';
import { User } from '../../models/user.model';
import type { IEntrepriseCreation } from '../../types/entreprise.types';

/**
 * Crée un nouveau profil d'entreprise.
 * @param userId - L'identifiant MongoDB de l'utilisateur lié
 * @param data - Les données du profil (sans userId)
 * @returns Le document entreprise créé
 */
export const ajouterProfilEntreprise = async (
  userId: Types.ObjectId,
  data: IEntrepriseCreation
) => {
  // Mettre à jour le whatsapp dans le modèle utilisateur si présent
  if (data.whatsapp) {
    await User.findByIdAndUpdate(userId, { whatsapp: data.whatsapp });
  }

  const nouvelleEntreprise = new Entreprise({
    utilisateurId: userId,
    ...data,
  });

  return await nouvelleEntreprise.save();
};

/**
 * Met à jour un profil entreprise existant.
 * @param userId - L'identifiant MongoDB de l'utilisateur lié
 * @param data - Les données à mettre à jour
 * @returns Le document entreprise mis à jour
 */
export const updateProfilEntreprise = async (
  userId: string | Types.ObjectId,
  data: Partial<IEntrepriseCreation>
) => {
  // Mettre à jour le whatsapp dans le modèle utilisateur si présent
  if (data.whatsapp) {
    await User.findByIdAndUpdate(userId, { whatsapp: data.whatsapp });
  }

  const objectId = typeof userId === 'string' ? new Types.ObjectId(userId) : userId;

  const updatedEntreprise = await Entreprise.findOneAndUpdate(
    { utilisateurId: objectId },
    { $set: data },
    { new: true }
  );

  return updatedEntreprise;
};

/**
 * Récupère tous les profils entreprises.
 * @returns Liste des profils entreprises
 */
export const getAllEntreprises = async () => {
  return await Entreprise.find().populate('utilisateurId', 'nom whatsapp email').exec();
};

/**
 * Récupère le profil entreprise par ID utilisateur.
 * @param userId - L'identifiant MongoDB de l'utilisateur lié
 * @returns Le profil entreprise ou null
 */
export const getEntrepriseByUserId = async (userId: string | Types.ObjectId) => {
  const objectId = typeof userId === 'string' ? new Types.ObjectId(userId) : userId;
  return await Entreprise.findOne({ utilisateurId: objectId }).populate('utilisateurId', 'nom whatsapp email').exec();
};
