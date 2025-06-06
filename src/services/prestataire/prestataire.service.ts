import { Prestataire } from '../../models/prestataire.models';
import type { IPrestataireCreation, IService } from '../../types/prestataire.type';
import { Types } from 'mongoose';
import { User } from '../../models/user.model';

/**
 * Crée un nouveau profil de prestataire.
 * @param userId - L'identifiant MongoDB de l'utilisateur lié
 * @param data - Les données du profil (sans userId)
 * @returns Le document prestataire créé
 */
export const ajouterProfilPrestataire = async (
  userId: Types.ObjectId,
  data: IPrestataireCreation
) => {
  // Mettre à jour le téléphone dans le modèle utilisateur si présent
  if (data.telephone) {
    await User.findByIdAndUpdate(userId, { telephone: data.telephone });
  }

  const nouveauPrestataire = new Prestataire({
    userId,
    ...data,
  });

  return await nouveauPrestataire.save();
};

/**
 * Met à jour un profil prestataire existant.
 * @param userId - L'identifiant MongoDB de l'utilisateur lié
 * @param data - Les données à mettre à jour
 * @returns Le document prestataire mis à jour
 */
export const updateProfilPrestataire = async (
  userId: string | Types.ObjectId,
  data: Partial<IPrestataireCreation>
) => {
  // Mettre à jour le téléphone dans le modèle utilisateur si présent
  if (data.telephone) {
    await User.findByIdAndUpdate(userId, { telephone: data.telephone });
  }

  const objectId = typeof userId === 'string' ? new Types.ObjectId(userId) : userId;

  const updatedPrestataire = await Prestataire.findOneAndUpdate(
    { userId: objectId },
    { $set: data },
    { new: true }
  );

  return updatedPrestataire;
};

/**
 * Récupère tous les profils prestataires.
 * @returns Liste des profils prestataires
 */
export const getAllPrestataires = async () => {
  return await Prestataire.find().populate('userId', 'nom telephone email').exec();
};

/**
 * Ajoute un service au profil prestataire.
 * @param userId - L'identifiant MongoDB de l'utilisateur lié
 * @param service - Le service à ajouter
 * @returns Le document prestataire mis à jour
 */
export const ajouterServicePrestataire = async (
  userId: string | Types.ObjectId,
  service: IService
) => {
  const objectId = typeof userId === 'string' ? new Types.ObjectId(userId) : userId;
  const prestataire = await Prestataire.findOne({ userId: objectId });
  if (!prestataire) {
    throw new Error('Prestataire non trouvée');
  }
  prestataire.services.push(service);
  return await prestataire.save();
};

/**
 * Récupère le profil prestataire par ID utilisateur.
 * @param userId - L'identifiant MongoDB de l'utilisateur lié
 * @returns Le profil prestataire ou null
 */
export const getPrestataireByUserId = async (userId: string | Types.ObjectId) => {
  const objectId = typeof userId === 'string' ? new Types.ObjectId(userId) : userId;
  return await Prestataire.findOne({ userId: objectId }).populate('userId', 'nom telephone email').exec();
};
