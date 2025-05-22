const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/fidelites', async (req, res) => {
    try {
        const response = await fetch('http://fidelite:3000/api/fidelite');
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Erreur en appelant le service fidélité' });
    }
});

module.exports = router;
