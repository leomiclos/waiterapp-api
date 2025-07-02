import { Request, Response } from 'express';

import { Products } from '../../models/Products';

export async function listProductsByCategory(req: Request, res: Response) {
    try {
        const { categoryId } = req.params;
        const products = await Products.where('category').equals(categoryId);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar produtos', error });

    }
}
