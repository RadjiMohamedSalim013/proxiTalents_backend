import bcrypt from 'bcryptjs';
import { IUser } from '../../models/user.model';

export const resetPasswordService = async (utilisateur: IUser, nouveauMotDePasse: string): Promise<void> => {
  const hashedPassword = await bcrypt.hash(nouveauMotDePasse, 10);

  utilisateur.motDePasse = hashedPassword;
  utilisateur.resetToken = undefined;
  utilisateur.resetTokenExpiration = undefined;

  await utilisateur.save();
};
