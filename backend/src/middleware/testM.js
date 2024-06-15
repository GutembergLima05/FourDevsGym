import { msgError } from "../schemas/schema.js"
import { msgJson } from "../utils/responseJson.js"

export const validateEntry = (schema, stringObj) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body)
        next()
    } catch (error) {
        const { details: [ { type, context: { key } } ] } = error
        return msgJson(400, res, msgError[type].replace('$', key))
    }
}