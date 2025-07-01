import { Router } from "express";
import { listCategories } from "./useCases/categories/listCategories";

export const router = Router();

//list categories
router.get('/categories',  listCategories)

//create category
router.post('/categories', (req, res) => {
    res.send('Categoria criada com sucesso');
});

//list products
router.get('/products', (req, res) => {
    res.send('Lista de produtos');
});

//create product
router.post('/products', (req, res) => {
    res.send('Produto criado com sucesso');
});

//get product by category
router.get('/category/:categoryId/products', (req, res) => {
    const { categoryId } = req.params;
    res.send(`Produtos da categoria ${categoryId}`);
});

//list orders
router.get('/orders', (req, res) => {
    res.send('Lista de pedidos');
});

//create order
router.post('/orders', (req, res) => {
    res.send('Pedido criado com sucesso');
});

//change order status
router.patch('/orders/:orderId/status', (req, res) => {
    res.send(`Status do pedido ${req.params.orderId} alterado com sucesso`);
});

//delete order
router.delete('/orders/:orderId', (req, res) => {
    res.send(`Pedido ${req.params.orderId} deletado com sucesso`);
});