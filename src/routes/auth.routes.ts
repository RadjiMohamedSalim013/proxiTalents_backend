import express from 'express';
import { validerInscription } from '../middlewares/validateRegister.middleware';
import { forgotPassword, loginUser, registerUser, resetPassword } from '../controllers/auth.controller';
import { validateLogin } from '../middlewares/validateLogin.middleware';
import { validateResetToken } from '../middlewares/validateResetToken.middleware';

const router = express.Router();

//Route d'inscription avec middleware de validation
router.post('/register', validerInscription, registerUser);

// Route de connexion
router.post('/login',  validateLogin, loginUser);

router.post('/forgot-password', forgotPassword)

router.post('/reset-password/:token', validateResetToken, resetPassword);


export default router;
