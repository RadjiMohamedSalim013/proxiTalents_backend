import { Router } from 'express';
import { ajouterPrestataire } from '../controllers/prestataire.controller';
import { validateResetToken } from '../middlewares/validateResetToken.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

//  Route pour créer un profil prestataire (authentifié)
router.post('/', authMiddleware, ajouterPrestataire);

export default router;
