import { Router } from 'express';
import { ajouterPrestataire, getPrestataires, updatePrestataire, ajouterService, getPrestataireById, getPrestataireByUser } from '../controllers/prestataire.controller';
import { validateResetToken } from '../middlewares/validateResetToken.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

//  Route pour créer un profil prestataire (authentifié) avec upload fichiers
router.post('/', authMiddleware, upload.array('medias', 10), ajouterPrestataire);

// Route pour récupérer tous les profils prestataires (authentifié)
router.get('/', authMiddleware, getPrestataires);

// Route pour récupérer un prestataire par id (authentifié)
router.get('/:id', authMiddleware, getPrestataireById);

// Route pour récupérer le profil prestataire de l'utilisateur connecté (authentifié)
router.get('/user/profile', authMiddleware, getPrestataireByUser);

// Route pour modifier un profil prestataire (authentifié)
router.put('/', authMiddleware, updatePrestataire);

// Route pour ajouter un service au profil prestataire (authentifié)
router.post('/service', authMiddleware, ajouterService);

export default router;
