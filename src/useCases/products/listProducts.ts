/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';

import { Products } from '../../app/models/Products';

export async function listProducts(req: Request, res: Response) {
    try {
        const products = await Products.find();
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

