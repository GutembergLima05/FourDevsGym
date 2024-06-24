import { Router } from "express";
import { validateEntry, validateTokenAndRole } from "../../middleware/middlewares.js";
import { s_idCheck, s_evaluation } from "../../schemas/schema.js";
import * as evaluation from "../../controller/evaluation/evaluationController.js"

export const routeEvaluation = Router();

routeEvaluation.route('/evaluation')
.all(validateTokenAndRole('administrador','id_adm'))
.post(validateEntry(s_evaluation, 'body'), evaluation.register)
.get(evaluation.getAllEvaluation)

routeEvaluation.route('/evaluation/:id')
.all(validateEntry(s_idCheck, 'params'), validateTokenAndRole('administrador','id_adm'))
.put(validateEntry(s_evaluation, 'body'), evaluation.update)
.get(evaluation.getEvaluationById)
.delete(evaluation.deleteEvaluation)