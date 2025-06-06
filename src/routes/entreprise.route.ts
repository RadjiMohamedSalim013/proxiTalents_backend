import { Router } from 'express';
import { ajouterEntreprise, getEntreprises, updateEntreprise, getEntrepriseByUser } from '../controllers/entreprise.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, ajouterEntreprise);
router.get('/', authMiddleware, getEntreprises);
router.get('/all', getEntreprises);
router.get('/user/profile', authMiddleware, getEntrepriseByUser);
router.put('/', authMiddleware, updateEntreprise);

export default router;
