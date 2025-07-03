// src/lib/rabbitmq.ts
import amqp from 'amqplib';

let channel: amqp.Channel;

export async function connectRabbitMQ() {

    const rabbitmq = process.env.RABBITMQ_URL || 'amqp://admin:admin@rabbitmq';

    const connection = await amqp.connect(rabbitmq);
    channel = await connection.createChannel();
    console.log('[RabbitMQ] Conectado com sucesso');

    return channel;
}

export function getChannel() {
    if (!channel) throw new Error('RabbitMQ não conectado');
    return channel;
}
