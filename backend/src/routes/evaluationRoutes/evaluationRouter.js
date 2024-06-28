const { Router } = require( "express")
const { validateEntry, validateTokenAndRole } = require( "../../middleware/middlewares.js")
const { s_idCheck, s_evaluation } = require( "../../schemas/schema.js")
const evaluation = require("../../controller/evaluation/evaluationController.js");

const routeEvaluation = Router();

routeEvaluation.route('/evaluation')
.all(validateTokenAndRole('administrador','id_adm'))
.post(validateEntry(s_evaluation, 'body'), evaluation.register)
.get(evaluation.getAllEvaluation)

routeEvaluation.route('/evaluation/:id')
.all(validateEntry(s_idCheck, 'params'), validateTokenAndRole('administrador','id_adm'))
.put(validateEntry(s_evaluation, 'body'), evaluation.update)
.get(evaluation.getEvaluationById)
.delete(evaluation.deleteEvaluation)

module.exports = {
    routeEvaluation
}