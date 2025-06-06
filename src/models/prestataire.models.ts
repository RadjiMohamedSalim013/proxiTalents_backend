import mongoose, { Document, Schema } from 'mongoose';

export interface IReseaux {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  youtube?: string;
  siteWeb?: string;
}

export interface IService {
  nom: string;
  description?: string;
  tarif?: number;
}

export interface IMedia {
  type: 'image' | 'video';
  url: string;
  description?: string;
}

export interface IPrestataire extends Document {
  userId: mongoose.Types.ObjectId;
  titre?: string;
  bio?: string;
  zoneGeographique?: string; 
  ville?: string;
  services: IService[];
  medias?: IMedia[];
  reseaux?: IReseaux;
  disponibilite?: string;
  noteMoyenne?: number;
  nombreAvis?: number;
  verified?: boolean;
  tags?: string[];
}

const prestataireSchema = new Schema<IPrestataire>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    titre: {
      type: String,
    },
    bio: {
      type: String,
    },
    zoneGeographique: {
      type: String,
    },
    ville: {
      type: String,
    },
    services: [
      {
        nom: { type: String, required: true },
        description: String,
        tarif: Number,
      },
    ],
    medias: [
      {
        type: {
          type: String,
          enum: ['image', 'video'],
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        description: String,
      },
    ],
    reseaux: {
      facebook: String,
      instagram: String,
      linkedin: String,
      tiktok: String,
      youtube: String,
      siteWeb: String,
    },
    disponibilite: {
      type: String,
    },
    noteMoyenne: {
      type: Number,
      default: 0,
    },
    nombreAvis: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Prestataire = mongoose.model<IPrestataire>(
  'Prestataire',
  prestataireSchema
);
