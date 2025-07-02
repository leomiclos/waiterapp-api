/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { Order } from '../../models/Order';


export async function listOrders(req: Request, res: Response) {
    try {
        const orders = await Order.find()
            .sort({ createdAt: -1 }) // Sort by creation date, most recent first
            .populate('products.product') 
        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

