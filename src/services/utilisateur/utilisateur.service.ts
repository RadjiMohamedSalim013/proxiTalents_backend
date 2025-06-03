// src/services/utilisateur.service.ts
import { User, IUser } from '../../models/user.model';

export const recupererProfilUtilisateur = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId).select('-motDePasse');
};
