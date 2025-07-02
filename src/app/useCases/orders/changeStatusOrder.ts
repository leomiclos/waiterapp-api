import { Request, Response } from 'express';
import { Order } from '../../models/Order';

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

        return res.status(200).json({
            message: 'Status do pedido alterado com sucesso',
            order: updatedOrder,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao alterar status do pedido' });
    }
}
