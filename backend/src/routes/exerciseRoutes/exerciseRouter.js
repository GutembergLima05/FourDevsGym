import { Router } from "express";
import { validateEntry, validateTokenAndRole } from "../../middleware/middlewares.js";
import { s_exercise, s_idCheck } from "../../schemas/schema.js";
import * as exercise from "../../controller/exercise/exerciseController.js"

export const routeExercise = Router();

routeExercise.route('/exercise')
.post(validateEntry(s_exercise, 'body'), exercise.register)
.get(exercise.getAllExercise)

routeExercise.route('/exercise/:id')
.all(validateEntry(s_idCheck, 'params'))
.put(validateEntry(s_exercise, 'body'), exercise.update)
.get(exercise.getExerciseById)
.delete(exercise.deleteExercise)