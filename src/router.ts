import { Router } from "express";
import { listCategories } from "./useCases/categories/listCategories";
import { createCategory } from './useCases/categories/createCategory';
import { createProduct } from "./useCases/products/createProducts";
import { listProducts } from "./useCases/products/listProducts";
import multer from "multer";
import path from "node:path"

export const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.resolve(__dirname, '..', 'assets'))
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
});


//list categories
router.get('/categories', listCategories)

//create category
router.post('/categories', createCategory);

//list products
router.get('/products', listProducts);

//create product
router.post('/products', upload.single('image'), createProduct);

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