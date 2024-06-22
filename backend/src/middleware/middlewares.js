import { msgError } from "../utils/responseJson.js"
import { msgJson } from "../utils/responseJson.js"
import { knex } from '../database/connection/dbConnection.js'

export const validateEntry = (schema, source = 'body') => async (req, res, next) => {
    try {
        const dataToValidate = source === 'params' ? req.params : 
                                source === 'query' ? req.query : req.body;
        await schema.validateAsync(dataToValidate)
        next()
    } catch (error) {
        const { details: [ { type, context: { key } } ] } = error
        return msgJson(400, res, msgError[type].replace('$', key), false)
    }
}


export const uniqueField = (table, fields, path, nameObj = 'dataUnique') => async (req, res, next) => {
    try {
        const whereConditions = fields.map(field => ({ [field]: req[path][field] }));

        const results = await knex(table).where(builder => {
            whereConditions.forEach(condition => {
                builder.orWhere(condition);
            });
        });

        if (results.length > 0) {
            const duplicateField = fields.find(field => results[0][field] === req[path][field]);

            req[nameObj] = {
                idObj: results[0],
                field: duplicateField
            };
        }
        next(); 
    } catch (error) {
        msgJson(500, res, 'Erro interno no servidor ao validar campos únicos', false);
    }
};
