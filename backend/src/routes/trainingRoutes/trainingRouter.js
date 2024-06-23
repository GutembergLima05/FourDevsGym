import { Router } from "express";
import { validateEntry, validateTokenAndRole } from "../../middleware/middlewares.js";
import { s_idCheck, s_training } from "../../schemas/schema.js";
import * as training from "../../controller/training/trainingController.js"

export const routeTraining = Router();

routeTraining.route('/training')
.post(validateEntry(s_training, 'body'), training.register)
.get(training.getAllTraining)

routeTraining.route('/training/:id')
.all(validateEntry(s_idCheck, 'params'))
.put(validateEntry(s_training, 'body'), training.update)
.get(training.getTrainingById)
.delete(training.deleteTraining)