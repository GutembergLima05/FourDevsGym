import { Router } from 'express'
import * as u from '../../controller/userController.js';
import { validateEntry } from '../../middleware/testM.js';
import { s_testSchema } from '../../schemas/schema.js';

export const routesUser = Router();

routesUser.route('/user').get(u.testMsg).post(validateEntry(s_testSchema, 'body'), u.testMsg )