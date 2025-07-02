import { Request, Response } from 'express';
import { Order } from '../../models/Order';
import { getChannel } from '../../../../lib/rabbitmq';

type OrderStatus = 'WAITING' | 'IN_PRODUCTION' | 'DONE';

function isValidStatus(status: OrderStatus): status is OrderStatus {
  return ['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status);
}

export async function changeStatusOrder(req: Request, res: Response): Promise<Response> {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!isValidStatus(status)) {
      return res.status(400).json({ message: 'Status inválido' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate('products.product');

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    // Enviar mensagem para fila 'statusChange' para o worker processar
    const channel = getChannel();
    const queue = 'statusChange';
    await channel.assertQueue(queue, { durable: true });

    const messagePayload = {
      orderId: updatedOrder._id.toString(),
      status: updatedOrder.status,
      table: updatedOrder.table,
      updatedAt: new Date(),
    };

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(messagePayload)), {
      persistent: true,
    });

    return res.status(200).json({
      message: 'Status do pedido alterado com sucesso',
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao alterar status do pedido' });
  }
}
