import express from 'express';
import dotenv from 'dotenv';
import { connectMongoDB } from './config/db';
import authRoutes from './routes/auth.routes';
import userRoutes  from './routes/user.routes';
import prestataireRoutes from './routes/prestataire.route';
import entrepriseRoutes from './routes/entreprise.route';
import offreEmploiRoutes from './routes/offreEmploi.route';

import cors from 'cors';



dotenv.config();
const PORT = process.env.PORT;


const app = express();

app.use(cors());


app.use(express.json());


// Connexion à la base de données MongoDB
connectMongoDB();

// Routes d'authentification
app.use('/api/auth', authRoutes);
app.use('/api/utilisateur', userRoutes);
app.use('/api/prestataires', prestataireRoutes);
app.use('/api/entreprises', entrepriseRoutes);
app.use('/api/offres', offreEmploiRoutes);


app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});

