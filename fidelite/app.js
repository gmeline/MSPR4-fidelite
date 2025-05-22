require('dotenv').config();    
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const fideliteRoutes = require('./routes/fidelite');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger/swagger');

app.use(express.json());

// Connexion à MongoDB via mongoose
console.log("MONGO_URI utilisée :", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log('MongoDB connecté'))
.catch(err => console.error('Erreur connexion MongoDB:', err));

// Routes de l'API
app.use('/api/fidelite', fideliteRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Fidélité service running on port ${port}`);
});
