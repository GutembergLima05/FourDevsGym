import { Router } from "express";
import { uniqueField, validateEntry } from "../../middleware/middlewares.js";
import { s_admSchema, s_login } from "../../schemas/schema.js";
import * as adm from '../../controller/admin/adminController.js'

export const routeAdm = Router();

routeAdm.route('/adm').post(validateEntry(s_admSchema, 'body'), uniqueField('adm', ['email'], 'body'), adm.register)
routeAdm.route('/adm/login').post(validateEntry(s_login, 'body'), uniqueField('adm', ['email'], 'body'), adm.login)