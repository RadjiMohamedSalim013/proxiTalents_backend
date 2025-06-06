import mongoose, { Document, Schema } from 'mongoose';

export interface IEntreprise extends Document {
  utilisateurId: mongoose.Types.ObjectId;
  nom: string;
  description?: string;
  ville: string;
  whatsapp?: string;
  email: string;
  siteWeb?: string;
  secteurActivite: string;
  createdAt: Date;
  updatedAt: Date;
}

const entrepriseSchema = new Schema<IEntreprise>(
  {
    utilisateurId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    nom: { type: String, required: true },
    description: { type: String },
    ville: { type: String, required: true },
    whatsapp: { type: String },
    email: { type: String, required: true },
    siteWeb: { type: String },
    secteurActivite: { type: String, required: true },
  },
  { timestamps: true }
);

const Entreprise = mongoose.model<IEntreprise>('Entreprise', entrepriseSchema);

export default Entreprise;
