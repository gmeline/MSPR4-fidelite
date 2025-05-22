const express = require('express');
const router = express.Router();
const Fidelite = require('../models/fidelite'); // Importer le modèle Mongoose

// GET /api/fidelite - Liste toutes les fidélités
router.get('/', async (req, res) => {
  try {
    const fidelites = await Fidelite.find();
    res.json(fidelites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/fidelite/:id - Récupère une fidélité par id
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  // Vérifie si l'id est un ObjectId valide
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  try {
    const fidelite = await Fidelite.findById(id);
    if (!fidelite) return res.status(404).json({ message: 'Client non trouvé' });
    res.json(fidelite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/fidelite - Crée une nouvelle fidélité
router.post('/', async (req, res) => {
  const { nom, points } = req.body;
  if (!nom || points === undefined) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  const nouvelleFidelite = new Fidelite({ nom, points });
  try {
    const savedFidelite = await nouvelleFidelite.save();
    res.status(201).json(savedFidelite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/fidelite/:id - Met à jour une fidélité
router.put('/:id', async (req, res) => {
  try {
    const { nom, points } = req.body;
    const fidelite = await Fidelite.findById(req.params.id);
    if (!fidelite) return res.status(404).json({ message: 'Client non trouvé' });

    if (nom) fidelite.nom = nom;
    if (points !== undefined) fidelite.points = points;

    const updated = await fidelite.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/fidelite/:id - Supprime une fidélité
router.delete('/:id', async (req, res) => {
  try {
    const fidelite = await Fidelite.findById(req.params.id);
    if (!fidelite) return res.status(404).json({ message: 'Client non trouvé' });

    await fidelite.remove();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
