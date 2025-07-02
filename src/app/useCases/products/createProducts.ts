import { Request, Response } from 'express';
import { Products } from '../../models/Products';


export async function createProduct(req: Request, res: Response) {
    try {
        const imagePath = req.file?.filename
        const { name, price, description, ingredients, category } = req.body;

        const parsedIngredients = ingredients
            ? JSON.parse(ingredients)
            : [];

        const newProduct = new Products({
            name,
            price: Number(price),
            description,
            ingredients: parsedIngredients,
            category,
            imagePath
        });
        await newProduct.save();
        res.status(201).json({ message: "Produto criado com sucesso", newProduct });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar produto", error });
    }
}
