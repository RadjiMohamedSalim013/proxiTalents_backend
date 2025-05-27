import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT ;

app.get('/', (req, res) => {
  res.send('API  backend fonctionne !');
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
