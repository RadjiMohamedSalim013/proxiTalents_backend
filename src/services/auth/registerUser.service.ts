import bcrypt from 'bcryptjs';
import { User } from '../../models/user.model';
import { IUser } from '../../types/user.types';

export const registerUserService = async (userData: IUser): Promise<void> => {
  let { nom, email, motDePasse, role } = userData;
  console.log('Role reçu:', role);

  // Définir le rôle par défaut si non fourni
  if (!role) {
    role = 'utilisateur';
  }

  // Vérifie si utilisateur existe déjà
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Utilisateur déjà existant');
  }

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(motDePasse, 10);

  // Création utilisateur
  const newUser = new User({
    nom,
    email,
    motDePasse: hashedPassword,
    role,
  });

  // Sauvegarde dans la base de données
  await newUser.save();
};
