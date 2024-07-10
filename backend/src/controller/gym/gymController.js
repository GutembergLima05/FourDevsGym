const { msgJson } = require("../../utils/responseJson.js")
const { knex } = require("../../database/connection/dbConnection.js")

const register = async (req, res) => {
    const { body, dataUnique} = req

    try {
        if (dataUnique && dataUnique.field) return msgJson(400, res, `O campo '${dataUnique.field}' com valor '${dataUnique.idObj.nome}' já está em uso.`, false);

            const [ gymInfo ] = await knex('academia').insert({...body}).select('*')

        msgJson(201, res, gymInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar academia.', false)
    }
}

const update = async(req, res) => {
    const { params: { id: id_academia }, body, dataUnique} = req

    try {
        const dbInfo = await knex('academia').where({ id_academia }).select('*');
        if (!dbInfo || dbInfo.length === 0 ) return msgJson(404, res, 'Academia não encontrada.')

        if (dataUnique && dataUnique.field && dbInfo[0].nome !== dataUnique.idObj.nome) return msgJson(400, res, `O campo '${dataUnique.field}' com valor '${dataUnique.idObj.nome}' já está em uso.`, false);

        const [ gymInfo ] = await knex('academia').update({...body}).where({ id_academia }).select(['id_academia', 'nome', 'endereco'])

        msgJson(201, res, gymInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar academia.', false)
    }
}

const deleteGym = async(req, res) => {
    const { params: { id: id_academia }} = req

    try {
        let gymInfo = await knex('academia').where({ id_academia }).select('*');
        if (!gymInfo || gymInfo.length === 0 ) return msgJson(404, res, 'Academia não encontrada.')

        gymInfo = await knex('academia').where({ id_academia }).del().select('*');

        msgJson(201, res, gymInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar academia.', false)
    }
}

const getGymById = async(req, res) => {
    const { params: { id: id_academia }} = req

    try {
        const gymInfo = await knex('academia').where({ id_academia }).select('*');
        if (!gymInfo || gymInfo.length === 0 ) return msgJson(404, res, 'Academia não encontrada.')

        msgJson(201, res, gymInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar academia.', false)
    }
}

const getAllGym = async(req, res) => {
    try {
        const gymInfo = await knex('academia').select('*');

        msgJson(201, res, gymInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar academia.', false)
    }
}

module.exports = {
    register,
    update,
    getAllGym,
    getGymById,
    deleteGym
}

