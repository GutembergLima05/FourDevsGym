import { Router } from "express";
import { uniqueField, validateEntry, validateTokenAndRole } from "../../middleware/middlewares.js";
import { s_gym, s_idCheck } from "../../schemas/schema.js";
import * as gym from "../../controller/gym/gymController.js"

export const routeGym = Router();

routeGym.route('/gym')
.all(validateTokenAndRole('administrador','id_adm', 'dono'))
.post(
    validateEntry(s_gym, 'body'), 
    uniqueField('academia', ['nome'], 'body'), gym.register)
    .get(gym.getAllGym)
    


routeGym.route('/gym/:id')
.all(validateEntry(s_idCheck, 'params'),validateTokenAndRole('administrador','id_adm', 'dono'))
    .put(
        validateEntry(s_gym, 'body'),
        uniqueField('academia', ['nome'], 'body'),
        gym.update)
    .get(gym.getGymById)
    .delete(gym.deleteGym)