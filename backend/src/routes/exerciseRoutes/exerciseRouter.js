const { Router } = require( "express")
const { validateEntry, validateTokenAndRole } = require( "../../middleware/middlewares.js")
const { s_exercise, s_idCheck } = require( "../../schemas/schema.js")
const exercise = require( "../../controller/exercise/exerciseController.js")

const routeExercise = Router();

routeExercise.route('/exercise')
.all(validateTokenAndRole('administrador','id_adm'))
.post(validateEntry(s_exercise, 'body'), exercise.register)
.get(exercise.getAllExercise)


routeExercise.route('/exercise/:id')
.all(validateEntry(s_idCheck, 'params'), validateTokenAndRole('administrador','id_adm'))
.put(validateEntry(s_exercise, 'body'), exercise.update)
.get(exercise.getExerciseById)
.delete(exercise.deleteExercise)

module.exports = {
    routeExercise
}