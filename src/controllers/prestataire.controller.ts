import { Request, Response } from 'express';
import { ajouterProfilPrestataire, getAllPrestataires, updateProfilPrestataire, ajouterServicePrestataire } from '../services/prestataire/prestataire.service';
import { IUtilisateurRequest } from '../types/express/index';
import type { IPrestataireCreation, IMedia, IService } from '../types/prestataire.type';
import { Prestataire } from '../models/prestataire.models';

export const ajouterPrestataire = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const utilisateur = (req as IUtilisateurRequest).utilisateur;

    if (!utilisateur || !utilisateur._id) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    // Récupérer les fichiers uploadés
    const fichiers = req.files as Express.Multer.File[] | undefined;

    // Construire le tableau medias à partir des fichiers uploadés
    let medias: IMedia[] = [];
    if (fichiers && fichiers.length > 0) {
      medias = fichiers.map((file) => {
        // Déterminer le type à partir de l'extension
        const ext = file.mimetype.split('/')[0];
        return {
          type: ext === 'video' ? 'video' : 'image',
          url: `/uploads/${file.filename}`,
          description: '',
        };
      });
    }

    // Récupérer les autres données du prestataire depuis req.body
    const donneesPrestataire: IPrestataireCreation = req.body;

    // Ajouter les medias au profil prestataire
    donneesPrestataire.medias = medias;

    const nouveauProfil = await ajouterProfilPrestataire(
      utilisateur._id,
      donneesPrestataire
    );

    res.status(201).json({
      message: 'Profil prestataire créé avec succès.',
      prestataire: nouveauProfil,
    });
  } catch (erreur) {
    console.error('Erreur lors de la création du profil prestataire :', erreur);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

export const getPrestataires = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prestataires = await getAllPrestataires();
    res.status(200).json(prestataires);
  } catch (erreur) {
    console.error('Erreur lors de la récupération des prestataires :', erreur);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

export const updatePrestataire = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const utilisateur = (req as IUtilisateurRequest).utilisateur;

    if (!utilisateur || !utilisateur._id) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    console.log('updatePrestataire utilisateur:', utilisateur);
    console.log('updatePrestataire utilisateur._id:', utilisateur._id);

    // Récupérer les données à mettre à jour depuis req.body
    const donneesMaj: Partial<IPrestataireCreation> = req.body;

    // Vérifier si le prestataire existe
    const prestataireExistant = await Prestataire.findOne({ userId: utilisateur._id });
    if (!prestataireExistant) {
      res.status(404).json({ message: 'Profil prestataire non trouvé.' });
      return;
    }

    const profilMisAJour = await updateProfilPrestataire(utilisateur._id, donneesMaj);

    res.status(200).json({
      message: 'Profil prestataire mis à jour avec succès.',
      prestataire: profilMisAJour,
    });
  } catch (erreur) {
    console.error('Erreur lors de la mise à jour du profil prestataire :', erreur);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

export const ajouterService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const utilisateur = (req as IUtilisateurRequest).utilisateur;

    if (!utilisateur || !utilisateur._id) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    console.log('ajouterService utilisateur._id:', utilisateur._id);

    const service: IService = req.body;

    const prestataireMisAJour = await ajouterServicePrestataire(utilisateur._id, service);

    res.status(200).json({
      message: 'Service ajouté avec succès.',
      prestataire: prestataireMisAJour,
    });
  } catch (erreur) {
    console.error('Erreur lors de l\'ajout du service :', erreur);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

export const getPrestataireById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const prestataire = await Prestataire.findById(id).populate('userId', 'nom telephone email').exec();

    if (!prestataire) {
      res.status(404).json({ message: 'Prestataire non trouvé.' });
      return;
    }

    res.status(200).json(prestataire);
  } catch (erreur) {
    console.error('Erreur lors de la récupération du prestataire :', erreur);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
