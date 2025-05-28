import { User } from '../../models/user.model';
import bcrypt from 'bcryptjs';

export const changerMotDePasse = async (
  email: string,
  ancienMotDePasse: string,
  nouveauMotDePasse: string
): Promise<{ message: string }> => {
  const utilisateur = await User.findOne({ email });
  if (!utilisateur) throw new Error('Utilisateur introuvable');

  const motDePasseValide = await bcrypt.compare(ancienMotDePasse, utilisateur.motDePasse);
  if (!motDePasseValide) throw new Error('Mot de passe actuel incorrect');

  const nouveauHash = await bcrypt.hash(nouveauMotDePasse, 10);
  utilisateur.motDePasse = nouveauHash;

  await utilisateur.save();

  return { message: 'Mot de passe mis à jour avec succès' };
};
