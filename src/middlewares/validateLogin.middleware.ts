import { Request, Response, NextFunction } from 'express';

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
    const { email, motDePasse } = req.body;

    // Vérifie si les champs sont présents
    if (!email || !motDePasse) {
        res.status(400).json({ message: 'Email et mot de passe sont requis.' });
        return;
    }

    // Vérifie si l’email est au bon format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Email invalide.' });
        return;
    }

    next(); // Passe au contrôleur
};
