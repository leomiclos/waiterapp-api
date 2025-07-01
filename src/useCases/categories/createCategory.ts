/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';

import { Category } from '../../app/models/Category';

export async function createCategory(req: Request, res: Response) {
    try {
        const { name } = req.body;
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
