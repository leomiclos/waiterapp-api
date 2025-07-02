// src/lib/rabbitmq.ts
import amqp from 'amqplib';

let channel: amqp.Channel;

export async function connectRabbitMQ() {
  const connection = await amqp.connect('amqp://localhost');
  channel = await connection.createChannel();
  console.log('[RabbitMQ] Conectado com sucesso');

  return channel;
}

export function getChannel() {
  if (!channel) throw new Error('RabbitMQ não conectado');
  return channel;
}
