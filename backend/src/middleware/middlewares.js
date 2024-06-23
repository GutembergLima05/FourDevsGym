import { msgError, msgJson  } from "../utils/responseJson.js"
import { knex } from '../database/connection/dbConnection.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

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

export const validateTokenAndRole = (table, idField = 'id', requiredRole = null) => async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return msgJson(400, res, 'Informe o token.');

    const token = authorization.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decodedToken[idField];
        const userRole = decodedToken.cargo;

        const [user] = await knex(table).where({ [idField]: userId });

        if (!user) return msgJson(404, res, 'Usuário não encontrado.');
        delete user.senha;

        if (requiredRole && userRole !== requiredRole) {
            throw new Error('invalid_role');
        }

        req.usuarioLogado = { ...user };
        next();
    } catch (error) {
        const errorMessage = error.message === 'invalid_role' ? 
            'Acesso negado. Você não tem permissão para realizar esta ação.' : 
            'Não autorizado.';
        return msgJson(401, res, errorMessage);
    }
};


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
