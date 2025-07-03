import { Request, Response } from 'express';

import { Order } from '../../models/Order';
import { getChannel } from '../../../lib/rabbitmq';

export async function createOrder(req: Request, res: Response) {
  try {
    const order = await Order.create({
      table: req.body.table,
      products: req.body.products,
    });

    const channel = getChannel();
    const queue = 'orders';

    await channel.assertQueue(queue, { durable: true });
    
    // Log para debug
    console.log('[API] Enviando pedido para fila:', order._id);

    const orderData = {
      _id: order._id,
      table: order.table,
      products: order.products,
      status: order.status,
      createdAt: order.createdAt,
    };

    const sent = channel.sendToQueue(queue, Buffer.from(JSON.stringify(orderData)), {
      persistent: true,
    });

    if (!sent) {
      console.warn('[API] Mensagem não pôde ser enfileirada!');
    } else {
      console.log('[API] Pedido enviado para fila com sucesso');
    }

    res.status(201).json({ message: 'Pedido criado e enviado para fila com sucesso', order });
  } catch (error) {
    console.error('[API] Erro ao criar pedido:', error);
    res.status(500).json({ message: 'Erro ao criar pedido', error });
  }
}
