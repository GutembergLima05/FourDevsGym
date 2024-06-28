const { Router } = require( "express")
const { validateEntry, validateTokenAndRole } = require( "../../middleware/middlewares.js")
const { s_idCheck, s_product } = require( "../../schemas/schema.js")
const product = require( "../../controller/product/productController.js")

const routeProduct = Router();

routeProduct.route('/product')
.all(validateTokenAndRole('administrador','id_adm'))
.post(validateEntry(s_product, 'body'), product.register)
.get(product.getAllProduct)

routeProduct.route('/product/:id')
.all(validateEntry(s_idCheck, 'params'), validateTokenAndRole('administrador','id_adm'))
.put(validateEntry(s_product, 'body'), product.update)
.get(product.getProductById)
.delete(product.deleteProduct)

module.exports = {
    routeProduct
}