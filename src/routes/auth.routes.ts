import express from 'express';
import { validerInscription } from '../middlewares/validateRegister.middleware';
import {changerMotDePasseController, forgotPassword, loginUser, registerUser, resetPassword } from '../controllers/auth.controller';
import { validateLogin } from '../middlewares/validateLogin.middleware';
import { validateResetToken } from '../middlewares/validateResetToken.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

//Route d'inscription avec middleware de validation
router.post('/register', validerInscription, registerUser);

// Route de connexion
router.post('/login',  validateLogin, loginUser, authMiddleware);

router.post('/forgot-password', forgotPassword)

router.post('/reset-password/:token', validateResetToken, resetPassword);

router.put('/changer-mot-de-passe', changerMotDePasseController);


export default router;
