import { msgJson } from "../../utils/responseJson.js"
import { knex } from "../../database/connection/dbConnection.js"

export const register = async (req, res) => {
    const { body, dataUnique} = req

    try {
        if (dataUnique && dataUnique.field) return msgJson(400, res, `O campo '${dataUnique.field}' com valor '${dataUnique.idObj.nome}' já está em uso.`, false);

            const [ gymInfo ] = await knex('academia').insert({...body}).returning('*')

        msgJson(201, res, gymInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar academia.', false)
    }
}

export const update = async(req, res) => {
    const { params: { id: id_academia }, body, dataUnique} = req

    try {
        const dbInfo = await knex('academia').where({ id_academia }).returning('*');
        if (!dbInfo || dbInfo.length === 0 ) return msgJson(404, res, 'Academia não encontrada.')

            console.log(dbInfo)

        if (dataUnique && dataUnique.field && dbInfo[0].nome !== dataUnique.idObj.nome) return msgJson(400, res, `O campo '${dataUnique.field}' com valor '${dataUnique.idObj.nome}' já está em uso.`, false);

            const [ gymInfo ] = await knex('academia').update({...body}).where({ id_academia }).returning(['id_academia', 'nome', 'endereco'])

        msgJson(201, res, gymInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar academia.', false)
    }
}

export const deleteGym = async(req, res) => {
    const { params: { id: id_academia }} = req

    try {
        let gymInfo = await knex('academia').where({ id_academia }).returning('*');
        if (!gymInfo || gymInfo.length === 0 ) return msgJson(404, res, 'Academia não encontrada.')

        gymInfo = await knex('academia').where({ id_academia }).del().returning('*');

        msgJson(201, res, gymInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar academia.', false)
    }
}

export const getGymById = async(req, res) => {
    const { params: { id: id_academia }} = req

    try {
        const gymInfo = await knex('academia').where({ id_academia }).returning('*');
        if (!gymInfo || gymInfo.length === 0 ) return msgJson(404, res, 'Academia não encontrada.')

        msgJson(201, res, gymInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar academia.', false)
    }
}

export const getAllGym = async(req, res) => {
    try {
        const gymInfo = await knex('academia').returning('*');

        msgJson(201, res, gymInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar academia.', false)
    }
}


