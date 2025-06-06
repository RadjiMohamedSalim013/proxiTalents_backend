
import { Router } from 'express';
import { ajouterOffre, getOffresEntreprise, getOffreByIdController, deleteOffre, getAllOffres } from '../controllers/offreEmploi.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, ajouterOffre);
router.get('/entreprise', authMiddleware, getOffresEntreprise);
router.get('/all', getAllOffres);
router.get('/:id', getOffreByIdController);
router.delete('/:id', authMiddleware, deleteOffre);

export default router;
