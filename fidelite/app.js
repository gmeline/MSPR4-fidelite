require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const amqp = require('amqplib');

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

  async function startRabbitMQ() {
    const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
    const queue = 'youpi';
    const maxAttempts = 5;
    let attempt = 0;
  
    while (attempt < maxAttempts) {
      try {
        console.log(`Connexion à RabbitMQ, tentative ${attempt + 1}...`);
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
  
        await channel.assertQueue(queue, { durable: true });
  
        // Envoyer un message
        const message = 'I think is good';
        channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
        console.log("Message envoyé dans RabbitMQ :", message);
  
        // Consommer les messages
        channel.consume(queue, msg => {
          if (msg !== null) {
            console.log("Message reçu depuis RabbitMQ :", msg.content.toString());
            channel.ack(msg);
          }
        });
  
        // Connexion établie, sortir de la boucle
        break;
  
      } catch (error) {
        attempt++;
        console.error(`Erreur RabbitMQ (tentative ${attempt}/${maxAttempts}):`, error.message);
  
        if (attempt >= maxAttempts) {
          console.error('Nombre max de tentatives atteint, abandon.');
          process.exit(1); // ou gérer autrement si tu veux pas arrêter le service
        }
  
        console.log('Nouvelle tentative dans 3 secondes...');
        await new Promise(res => setTimeout(res, 3000)); // attendre 3 secondes avant retry
      }
    }
  }
  
startRabbitMQ();

app.use('/api/fidelite', fideliteRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Fidélité service running on port ${port}`);

}); 