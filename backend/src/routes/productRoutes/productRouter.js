import { Router } from "express";
import { validateEntry, validateTokenAndRole } from "../../middleware/middlewares.js";
import { s_idCheck, s_product } from "../../schemas/schema.js";
import * as product from "../../controller/product/productController.js"

export const routeProduct = Router();

routeProduct.route('/product')
.all(validateTokenAndRole('administrador','id_adm'))
.post(validateEntry(s_product, 'body'), product.register)
.get(product.getAllProduct)

routeProduct.route('/product/:id')
.all(validateEntry(s_idCheck, 'params'), validateTokenAndRole('administrador','id_adm'))
.put(validateEntry(s_product, 'body'), product.update)
.get(product.getProductById)
.delete(product.deleteProduct)