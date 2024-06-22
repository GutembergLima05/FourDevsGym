import { Router } from "express";
import { validateEntry, validateTokenAndRole } from "../../middleware/middlewares.js";
import { s_idCheck, s_plan } from "../../schemas/schema.js";
import * as plan from "../../controller/plan/planController.js"

export const routePlan = Router();

routePlan.route('/plan')
.post(validateEntry(s_plan, 'body'), plan.register)
.get(plan.getAllPlan)

routePlan.route('/plan/:id')
.all(validateEntry(s_idCheck, 'params'))
.put(validateEntry(s_plan, 'body'), plan.update)
.get(plan.getPlanById)
.delete(plan.deletePlan)