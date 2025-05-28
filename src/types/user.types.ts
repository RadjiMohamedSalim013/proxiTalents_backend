export interface IUser {
  nom: string;
  email: string;
  motDePasse: string;
  role: 'utilisateur' | 'prestataire' | 'entreprise';
}
