import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function cancelOrder(req: Request, res: Response): Promise<Response> {
    try {
        await Order.deleteOne({ _id: req.params.orderId });
        return res.status(200).json({ message: 'Pedido excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir todos os pedidos:', error);
        return res.status(500).json({ message: 'Erro ao excluir os pedidos.', error });
    }
}
