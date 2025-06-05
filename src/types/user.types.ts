import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  nom: string;
  email: string;
  telephone?: string;
  motDePasse: string;
  role: 'utilisateur' | 'prestataire' | 'entreprise';
  resetToken?: string;
  resetTokenExpiration?: Date;
}
