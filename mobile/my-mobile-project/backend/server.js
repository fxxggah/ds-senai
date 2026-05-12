const express = require('express');
const cors = require('cors');
require('dotenv').config();

const gamesRoutes = require('./src/routes/gamesRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/games', gamesRoutes);

app.listen(3000, () => {
  console.log('Servidor iniciado com sucesso na porta 3000 🚀');
});