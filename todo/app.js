require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const amqp = require('amqplib');

const app = express();

app.use(express.json());

const start = async () => {
  try {
    // Connexion MongoDB
    console.log("MONGO_URI utilisée :", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connecté');

    // Connexion RabbitMQ
    const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    const queue = 'ma_queue1';
    await channel.assertQueue(queue, { durable: true });

    // Envoi d'un message
    const message = 'Hello from app.js without rabbitmq.js';
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
    console.log('Message envoyé dans RabbitMQ:', message);

    // Consommation des messages
    channel.consume(queue, msg => {
      if (msg !== null) {
        console.log('Message reçu depuis RabbitMQ:', msg.content.toString());
        channel.ack(msg);
      }
    });

    // Démarrer le serveur Express
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });

  } catch (error) {
    console.error('Erreur dans le start:', error);
    process.exit(1);
  }
};

start();
