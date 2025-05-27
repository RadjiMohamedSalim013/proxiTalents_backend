import express from 'express';
import dotenv from 'dotenv';
import { connectMongoDB } from './config/db';
import authRoutes from './routes/auth.routes';

dotenv.config();
const PORT = process.env.PORT;


const app = express();

app.use(express.json());

// Connexion à la base de données MongoDB
connectMongoDB();

// Routes d'authentification
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});

