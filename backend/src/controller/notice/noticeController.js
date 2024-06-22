import { msgJson } from "../../utils/responseJson.js"
import { knex } from "../../database/connection/dbConnection.js"

export const register = async (req, res) => {
    const { body, dataUnique} = req

    try {
        if (dataUnique && dataUnique.field) return msgJson(400, res, `O campo '${dataUnique.field}' com valor '${dataUnique.idObj.nome}' já está em uso.`, false);

            const [ noticeInfo ] = await knex('aviso').insert({...body}).returning('*')

        msgJson(201, res, noticeInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar academia.', false)
    }
}