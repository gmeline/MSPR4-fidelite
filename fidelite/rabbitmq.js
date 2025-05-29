const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';

async function connectRabbitMQ() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  const queue = 'ma_queue2';

  await channel.assertQueue(queue, { durable: true });

  return { connection, channel, queue };
}

module.exports = connectRabbitMQ;
s