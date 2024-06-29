const { Router } = require( "express")
const { validateEntry, validateTokenAndRole } = require( "../../middleware/middlewares.js")
const { s_idCheck, s_plan } = require( "../../schemas/schema.js")
const plan = require( "../../controller/plan/planController.js");

const routePlan = Router();

routePlan.route('/plan')
.all(validateTokenAndRole('administrador','id_adm'))
.post(validateEntry(s_plan, 'body'), plan.register)
.get(plan.getAllPlan)

routePlan.route('/plan/:id')
.all(validateEntry(s_idCheck, 'params'), validateTokenAndRole('administrador','id_adm'))
.put(validateEntry(s_plan, 'body'), plan.update)
.get(plan.getPlanById)
.delete(plan.deletePlan)

module.exports = {
    routePlan
}