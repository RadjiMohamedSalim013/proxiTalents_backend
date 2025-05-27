import mongoose from 'mongoose';

// Fonction pour établir une connexion à la base de données MongoDB
export const connectMongoDB = async () => {
    try {
        // Connexion à MongoDB avec l'URI stockée dans les variables d'environnement
        await mongoose.connect(process.env.MONGO_URI as string);
        
        // Message de succès si la connexion est établie
        console.log('MongoDB connecté avec succès');
    } catch (error) {
        // Affiche une erreur en cas d'échec de connexion
        console.error('Erreur lors de la connexion à MongoDB :', error);
        
        // Arrête le processus avec un code d'erreur
        process.exit(1);
    }
}
