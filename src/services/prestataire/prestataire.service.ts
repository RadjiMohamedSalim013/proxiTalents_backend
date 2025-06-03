import { Prestataire } from '../../models/prestataire.models';
import type { IPrestataireCreation } from '../../types/prestataire.type';
import { Types } from 'mongoose';

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
  const nouveauPrestataire = new Prestataire({
    userId,
    ...data,
  });

  return await nouveauPrestataire.save();
};
