export interface IUser {
  nom: string;
  email: string;
  motDePasse: string;
  role: 'particulier' | 'prestataire' | 'entreprise';
}
