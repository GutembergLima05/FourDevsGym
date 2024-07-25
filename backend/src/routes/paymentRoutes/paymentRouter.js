const { Router } = require("express")
const { validateEntry, validateTokenAndRole } = require("../../middleware/middlewares.js")
const { s_idCheck, s_payment } = require("../../schemas/schema.js")
const payment = require("../../controller/payment/paymentController.js");

const routePayment = Router();

routePayment.route('/payment')
.all(validateTokenAndRole('administrador','id_adm'))
.post(validateEntry(s_payment, 'body'), payment.createPixPayment)

routePayment.route('/payment/:id_pagamento')
.all(validateTokenAndRole('administrador','id_adm'))
.get(payment.checkPaymentStatus)


module.exports = {
    routePayment
}