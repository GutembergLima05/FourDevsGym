const { Router } = require('express');
const { validateTokenAndRole } = require('../../middleware/middlewares.js');
const dashboard = require('../../controller/dashboard/dashboardController.js');

const routeDashboard = Router();

routeDashboard.route('/dashboard')
.all(validateTokenAndRole('administrador','id_adm'))
.get(dashboard.getInfoDashboard)


module.exports = {
    routeDashboard
};