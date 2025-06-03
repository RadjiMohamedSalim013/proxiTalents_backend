import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { recupererProfil } from '../controllers/utilisateur.controller';

const router = Router();

router.get('/me', authMiddleware, recupererProfil);

export default router;
