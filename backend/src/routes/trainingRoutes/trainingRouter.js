const { Router } = require("express")
const { validateEntry, validateTokenAndRole } = require("../../middleware/middlewares.js")
const { s_idCheck, s_training } = require("../../schemas/schema.js")
const training = require("../../controller/training/trainingController.js")

const routeTraining = Router();

routeTraining.route('/training')
.all(validateTokenAndRole('administrador','id_adm'))
.post(validateEntry(s_training, 'body'), training.register)
.get(training.getAllTraining)

routeTraining.route('/training/:id')
.all(validateEntry(s_idCheck, 'params'), validateTokenAndRole('administrador','id_adm'))
.put(validateEntry(s_training, 'body'), training.update)
.get(training.getTrainingById)
.delete(training.deleteTraining)

module.exports = {
    routeTraining
}