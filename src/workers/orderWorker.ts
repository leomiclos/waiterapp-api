// src/workers/orderWorker.ts
import amqp from 'amqplib';

async function start() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'orders';

    await channel.assertQueue(queue, { durable: true });
    console.log(`👷 Worker pronto. Escutando a fila "${queue}"...`);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const pedido = JSON.parse(msg.content.toString());

        console.log('📦 Pedido recebido no worker:');
        console.log(JSON.stringify(pedido, null, 2));

        //TODO: Aqui você pode adicionar a lógica para processar o pedido
        // Por exemplo, salvar no banco de dados, enviar notificações, etc.
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('❌ Erro no worker:', error);
  }
}

start();
