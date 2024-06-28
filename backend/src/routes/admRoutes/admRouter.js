const { Router } = require('express');
const { uniqueField, validateEntry, validateTokenAndRole } = require('../../middleware/middlewares.js');
const { s_admSchema, s_login } = require('../../schemas/schema.js');
const adm = require('../../controller/admin/adminController.js');

const routeAdm = Router();


routeAdm.route('/adm/login').post(validateEntry(s_login, 'body'), uniqueField('administrador', ['email'], 'body'), adm.login)

routeAdm.route('/adm')
.all(validateTokenAndRole('administrador','id_adm'))
.post(
    validateEntry(s_admSchema, 'body'), 
    uniqueField('administrador', ['email'], 'body'), adm.register)
    .get(adm.getAllAdm)
    

routeAdm.route('/adm/:id')
.all(validateTokenAndRole('administrador','id_adm'))
.get(adm.getAdmById)
.put(
    validateEntry(s_admSchema, 'body'),
    uniqueField('administrador', ['email'], 'body'),
    adm.update)
.delete(adm.deleteAdm)

module.exports = {
    routeAdm
};