import { Types } from 'mongoose';

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

// Type utilisé à la création (on ne fournit pas userId ici)
export type IPrestataireCreation = {
  bio?: string;
  zoneGeographique?: string;
  services: IService[];
  medias?: IMedia[];
  reseaux?: IReseaux;
  disponibilite?: string;
  noteMoyenne?: number;
  nombreAvis?: number;
  verified?: boolean;
  telephone?: string;
};
