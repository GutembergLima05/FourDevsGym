import { Router } from "express";
import { uniqueField, validateEntry, validateTokenAndRole } from "../../middleware/middlewares.js";
import { s_gym, s_idCheck } from "../../schemas/schema.js";
import * as gym from "../../controller/gym/gymController.js"

export const routeGym = Router();

routeGym.route('/gym').post(
    validateEntry(s_gym, 'body'), 
    uniqueField('academia', ['nome'], 'body'), gym.register)
    .get(gym.getAllGym)
    .all(validateTokenAndRole('administrador','id_adm', 'dono'))


routeGym.route('/gym/:id').all(
    validateEntry(s_idCheck, 'params'))
    .put(
        validateEntry(s_gym, 'body'),
        uniqueField('academia', ['nome'], 'body'),
        gym.update)
    .get(gym.getGymById)
    .delete(gym.deleteGym)
    .all(validateTokenAndRole('administrador','id_adm', 'dono'))