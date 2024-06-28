const { Router } = require( "express")
const { uniqueField, validateEntry, validateTokenAndRole } = require( "../../middleware/middlewares.js")
const { s_gym, s_idCheck } = require( "../../schemas/schema.js")
const gym = require( "../../controller/gym/gymController.js")

const routeGym = Router();

routeGym.route('/gym')
.all(validateTokenAndRole('administrador','id_adm', 'dono'))
.post(
    validateEntry(s_gym, 'body'), 
    uniqueField('academia', ['nome'], 'body'), gym.register)
    .get(gym.getAllGym)
    


routeGym.route('/gym/:id')
.all(validateEntry(s_idCheck, 'params'),validateTokenAndRole('administrador','id_adm', 'dono'))
    .put(
        validateEntry(s_gym, 'body'),
        uniqueField('academia', ['nome'], 'body'),
        gym.update)
    .get(gym.getGymById)
    .delete(gym.deleteGym)

module.exports = {
    routeGym
}