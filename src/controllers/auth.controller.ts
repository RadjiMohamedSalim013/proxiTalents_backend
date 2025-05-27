import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';


// Fonction pour enregistrer un nouvel utilisateur
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extraction des données du corps de la requête
        const { nom, email, motDePasse, role } = req.body;

        // vérification si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Utilisateur déjà existant' });
            return; 
        }

        // Hachage du mot de passe avant de l'enregistrer
        const hashedPassword = await bcrypt.hash(motDePasse, 10);

        // Création d'une nouvelle instance de l'utilisateur
        const newUser = new User({
            nom,
            email,
            motDePasse: hashedPassword,
            role
        });

        // Enregistrement de l'utilisateur dans la base de données
        await newUser.save();

        // Réponse de succès
        res.status(201).json({ message: 'Utilisateur inscrit avec succès' });
    } catch (error) {
        
        // Gestion des erreurs
        res.status(500).json({ message: "Erreur lors de l'inscription", erreur: error });
    }
};
