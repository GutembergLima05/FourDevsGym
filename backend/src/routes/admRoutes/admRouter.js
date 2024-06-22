import { Router } from "express";
import { uniqueField, validateEntry, validateTokenAndRole } from "../../middleware/middlewares.js";
import { s_admSchema, s_login } from "../../schemas/schema.js";
import * as adm from '../../controller/admin/adminController.js'

export const routeAdm = Router();


routeAdm.route('/adm/login').post(validateEntry(s_login, 'body'), uniqueField('administrador', ['email'], 'body'), adm.login)

routeAdm.use(validateTokenAndRole('administrador','id_adm'))

routeAdm.route('/adm').post(
    validateEntry(s_admSchema, 'body'), 
    uniqueField('administrador', ['email'], 'body'), adm.register)
    .get(adm.getAllAdm)

routeAdm.route('/adm/:id')
.get(adm.getAdmById)
.put(
    validateEntry(s_admSchema, 'body'),
    uniqueField('administrador', ['email'], 'body'),
    adm.update)
.delete(adm.deleteAdm)