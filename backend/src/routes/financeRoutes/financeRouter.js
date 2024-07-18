const { Router } = require('express');
const { validateTokenAndRole } = require('../../middleware/middlewares.js');
const finance = require('../../controller/finance/financeController.js');

const routeFinance = Router();

routeFinance.route('/finance')
.all(validateTokenAndRole('administrador','id_adm'))
.get(finance.getInfoFinance)


module.exports = {
    routeFinance
};