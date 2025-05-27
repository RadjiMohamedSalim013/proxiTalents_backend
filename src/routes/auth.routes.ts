import express from 'express';
import { validerInscription } from '../middlewares/validateRegister.middleware';
import { loginUser, registerUser } from '../controllers/auth.controller';
import { validateLogin } from '../middlewares/validateLogin.middleware';

const router = express.Router();

//Route d'inscription avec middleware de validation
router.post('/register', validerInscription, registerUser);

// Route de connexion
router.post('/login',  validateLogin, loginUser);

export default router;
