// src/workers/orderWorker.ts
import amqp from 'amqplib';
import mongoose from 'mongoose';
import { Order } from '../app/models/Order'; // Importa o modelo do pedido
import { OrderLog } from '../app/models/OrderLog';

async function start() {
  try {
    await mongoose.connect('mongodb://mongo:27017/waiterapp');
    console.log('[MongoDB] Worker conectado com sucesso');

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'statusChange';

    await channel.assertQueue(queue, { durable: true });
    console.log(`👷 Worker pronto. Escutando a fila "${queue}"...`);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        try {
          const { orderId, status } = JSON.parse(msg.content.toString());
          console.log('[Worker] Pedido status change recebido:', orderId, status);

          // Atualiza o status do pedido no banco
          const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
          if (!order) {
            throw new Error(`Pedido ${orderId} não encontrado`);
          }

          // Cria log da alteração
          await OrderLog.create({
            orderId: order._id,
            table: order.table,
            status: order.status,
            createdAt: new Date(),
          });

          console.log('[Worker] Pedido atualizado e log salvo');

          channel.ack(msg); // confirma que processou
        } catch (err) {
          console.error('[Worker] Erro ao processar pedido:', err);
          channel.nack(msg, false, false); // rejeita e não requeue
        }
      }
    });
  } catch (error) {
    console.error('❌ Erro no worker:', error);
  }
}

start();
