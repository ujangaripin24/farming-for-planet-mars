import express from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/Product.js";

const router = express.Router();

router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.post('/products', createProduct);
router.patch('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

export default router;