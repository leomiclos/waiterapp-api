// src/workers/orderWorker.ts
import amqp from 'amqplib';
import mongoose from 'mongoose';
import { OrderLog } from '../app/models/OrderLog';
import 'dotenv/config';


async function start() {
    try {
        // 1. Conectar ao MongoDB
        const mongoUri = process.env.MONGO_URL;

        await mongoose.connect(mongoUri!);
        console.log('[MongoDB] Worker conectado com sucesso');

        // 2. Conectar ao RabbitMQ
        const connection = await amqp.connect(process.env.RABBITMQ_URL!);
        const channel = await connection.createChannel();
        const queue = 'orders';

        await channel.assertQueue(queue, { durable: true });
        console.log(`👷 Worker pronto. Escutando a fila "${queue}"...`);

        // 3. Consumir mensagens da fila
        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                try {
                    const pedido = JSON.parse(msg.content.toString());
                    console.log('[Worker] Pedido recebido:', pedido._id);

                    // Processo fictício, por exemplo salvar log
                    await OrderLog.create({
                        orderId: pedido._id,
                        table: pedido.table,
                        status: pedido.status,
                        createdAt: pedido.createdAt,
                    });

                    console.log('[Worker] Pedido processado e log salvo');

                    setTimeout(() => {
                        console.log(`[Worker] Pedido processado: ${pedido._id}`);
                        channel.ack(msg);
                    }, 2000); // 2 segundos por mensagem

                } catch (err) {
                    console.error('[Worker] Erro ao processar pedido:', err);
                    channel.nack(msg, false, false);
                }
            }
        });

    } catch (error) {
        console.error('❌ Erro no worker:', error);
    }
}

start();
