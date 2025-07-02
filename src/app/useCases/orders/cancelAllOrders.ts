import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function cancelAllOrders(req: Request, res: Response): Promise<Response> {
    try {
        await Order.deleteMany();
        return res.status(200).json({ message: 'Todos os pedidos foram excluídos com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir todos os pedidos:', error);
        return res.status(500).json({ message: 'Erro ao excluir os pedidos.', error });
    }
}
