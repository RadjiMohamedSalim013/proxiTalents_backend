import mongoose, { Document, Schema, Types } from 'mongoose';

// Interface TypeScript pour un utilisateur
export interface IUser extends Document {
  _id: Types.ObjectId;
  nom: string;
  email: string;
  motDePasse: string;
  role: 'utilisateur' | 'prestataire' | 'entreprise';
  resetToken?: string;
  resetTokenExpiration?: Date;
}

// Schéma Mongoose 
const userSchema = new Schema<IUser>(
  {
    nom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Veuillez entrer une adresse email valide.',
      ],
    },
    motDePasse: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['utilisateur', 'prestataire', 'entreprise'], 
      default: 'utilisateur',
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiration: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>('User', userSchema);
