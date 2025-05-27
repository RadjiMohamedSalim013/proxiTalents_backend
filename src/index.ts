import express from 'express';
import dotenv from 'dotenv';
import { connectMongoDB } from './config/db';
const PORT = process.env.PORT ;

dotenv.config();

const app = express();

app.use(express.json());

// Connexion à la base de données MongoDB
connectMongoDB();


app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});

