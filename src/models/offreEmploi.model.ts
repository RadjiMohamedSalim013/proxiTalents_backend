import mongoose, { Document, Schema } from 'mongoose';

export interface IOffreEmploi extends Document {
  entrepriseId: mongoose.Types.ObjectId;
  titre: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const offreEmploiSchema = new Schema<IOffreEmploi>(
  {
    entrepriseId: {
      type: Schema.Types.ObjectId,
      ref: 'Entreprise',
      required: true,
    },
    titre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OffreEmploi = mongoose.model<IOffreEmploi>('OffreEmploi', offreEmploiSchema);

export default OffreEmploi;
