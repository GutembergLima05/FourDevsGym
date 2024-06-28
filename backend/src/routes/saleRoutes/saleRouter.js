const { Router } = require("express")
const { validateEntry, validateTokenAndRole } = require("../../middleware/middlewares.js")
const { s_idCheck, s_sale } = require("../../schemas/schema.js")
const sale = require("../../controller/sale/saleController.js");

const routeSale = Router();

routeSale.route('/sale')
.all(validateTokenAndRole('administrador','id_adm'))
.post(validateEntry(s_sale, 'body'), sale.register)
.get(sale.getAllSale)

routeSale.route('/sale/:id')
.all(validateEntry(s_idCheck, 'params'), validateTokenAndRole('administrador','id_adm'))
.put(validateEntry(s_sale, 'body'), sale.update)
.get(sale.getSaleById)
.delete(sale.deleteSale)

module.exports = {
    routeSale
}