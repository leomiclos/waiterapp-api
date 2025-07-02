import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function createCategory(req: Request, res: Response) {
    try {
        await Category.create({
            _id: new Category()._id, // Generate a new ObjectId
            name: req.body.name,
            icon: req.body.icon
        });
        res.status(201).json({ message: 'Categoria criada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar categoria', error });
    }
}
