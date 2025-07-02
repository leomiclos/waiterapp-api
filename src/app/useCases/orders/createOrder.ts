import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function createOrder(req: Request, res: Response) {
    try {
        await Order.create({
            table: req.body.table,
            products: req.body.products
        });

        res.status(201).json({ message: 'Pedido criado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar categoria', error });
    }
}
