import { Router } from "express";
import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategory } from './app/useCases/categories/createCategory';
import { createProduct } from "./app/useCases/products/createProducts";
import { listProducts } from "./app/useCases/products/listProducts";
import multer from "multer";
import path from "node:path"
import { listProductsByCategory } from "./app/useCases/categories/listProductsByCategory";
import { listOrders } from "./app/useCases/orders/listOrders";
import { createOrder } from "./app/useCases/orders/createOrder";
import { changeStatusOrder } from "./app/useCases/orders/changeStatusOrder";
import { cancelOrder } from "./app/useCases/orders/cancelOrder";

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
router.get('/category/:categoryId/products', listProductsByCategory);

//list orders
router.get('/orders', listOrders);

//create order
router.post('/orders', createOrder);


// Express 5 traz uma nova definição de tipos que pode gerar conflito ao usar funções assíncronas como handlers.
// Aqui, o TypeScript entende erroneamente que a função é uma subaplicação (`Application`) e não um middleware.
// O cast abaixo força o TypeScript a tratar `changeStatusOrder` como um handler válido (RequestHandler),
// garantindo que o `router.patch(...)` aceite a função sem erro de tipagem.

//change order status
// router.patch('/orders/:orderId/status', changeStatusOrder);
router.patch(
  '/orders/:orderId/status',
  changeStatusOrder as unknown as import('express').RequestHandler
);

//delete order
router.delete('/orders/:orderId', cancelOrder as unknown as import('express').RequestHandler);

//delete order
// router.delete('/orders/:orderId', (req, res) => {
//     res.send(`Pedido ${req.params.orderId} deletado com sucesso`);
// });