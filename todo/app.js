const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const FIDELITE_API = 'http://fidelite:3000/api/fidelite';

app.get('/api/fidelite', async (req, res) => {
  try {
    const response = await axios.get(FIDELITE_API);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des fidélités' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Todo service running on port ${PORT}`);
});
