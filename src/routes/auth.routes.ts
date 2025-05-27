import express from 'express';
import { validerInscription } from '../middlewares/validateRegister.middleware';
import { registerUser } from '../controllers/auth.controller';

const router = express.Router();

//Route d'inscription avec middleware de validation
router.post('/register', validerInscription, registerUser);

export default router;
