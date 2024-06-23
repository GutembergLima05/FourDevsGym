import { Router } from "express";
import { validateEntry, validateTokenAndRole } from "../../middleware/middlewares.js";
import { s_idCheck, s_sale } from "../../schemas/schema.js";
import * as sale from "../../controller/sale/saleController.js"

export const routeSale = Router();

routeSale.route('/training')
.all(validateTokenAndRole('administrador','id_adm'))
.post(validateEntry(s_sale, 'body'), sale.register)
.get(sale.getAllSale)

routeSale.route('/sale/:id')
.all(validateEntry(s_idCheck, 'params'), validateTokenAndRole('administrador','id_adm'))
.put(validateEntry(s_sale, 'body'), sale.update)
.get(sale.getSaleById)
.delete(sale.deleteSale)