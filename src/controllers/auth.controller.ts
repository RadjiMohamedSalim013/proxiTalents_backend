import { Request, Response } from 'express';
import { registerUserService } from '../services/auth/registerUser.service';
import { loginUserService } from '../services/auth/loginUser.service';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await registerUserService(req.body);
    res.status(201).json({ message: 'Utilisateur inscrit avec succès' });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Erreur lors de l\'inscription' });
  }
};



export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, motDePasse } = req.body;

        const result = await loginUserService(email, motDePasse);

        res.status(200).json(result);
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};