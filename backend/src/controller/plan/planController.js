const { msgJson } = require("../../utils/responseJson.js")
const { knex } = require("../../database/connection/dbConnection.js")
const { formatDates } = require("../../service/noticeService.js")

const register = async (req, res) => {
    const { body } = req
    try {
        const [ planInfo ] = await knex('plano').insert({...body}).select('*')

        const formattedDates = formatDates(planInfo.data_criacao,planInfo.data_atualizacao, null, 3);
        
        planInfo.data_criacao = formattedDates.data_criacao;
        planInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, planInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar plano.', false)
    }
}

const update = async(req, res) => {
    const { params: { id: id_plano }, body} = req

    try {
        const idInfo = await knex('plano').where({ id_plano }).select('*');
        if (!idInfo || idInfo.length === 0 ) return msgJson(404, res, 'Plano não encontrado.')

        const [ planInfo ] = await knex('plano').update({...body}).where({ id_plano }).select('*')

        const formattedDates = formatDates(planInfo.data_criacao,planInfo.data_atualizacao, null, 3);
        
        planInfo.data_criacao = formattedDates.data_criacao;
        planInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, planInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao atualizar plano.', false)
    }
}

const deletePlan = async(req, res) => {
    const { params: { id: id_plano }} = req

    try {
        let planInfo = await knex('plano').where({ id_plano }).first().select('*');
        if (!planInfo || planInfo.length === 0 ) return msgJson(404, res, 'Plano não encontrado.')

        const formattedDates = formatDates(planInfo.data_criacao,planInfo.data_atualizacao, null, 3);
        
        planInfo.data_criacao = formattedDates.data_criacao;
        planInfo.data_atualizacao = formattedDates.data_atualizacao;

        await knex('plano').where({ id_plano }).first().del().select('*');

        msgJson(201, res, planInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao deletar plano.', false)
    }
}

const getPlanById = async(req, res) => {
    const { params: { id: id_plano }} = req

    try {
        const planInfo = await knex('plano').where({ id_plano }).first().select('*');
        if (!planInfo || planInfo.length === 0 ) return msgJson(404, res, 'Plano não encontrado.')

        const formattedDates = formatDates(planInfo.data_criacao,planInfo.data_atualizacao, null, 3);
        
        planInfo.data_criacao = formattedDates.data_criacao;
        planInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, planInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar plano.', false)
    }
}

const getAllPlan = async(req, res) => {
    try {
        const planInfo = await knex('plano').select('*');
        const formattedPlanInfo = planInfo.map(plan => {
            const formattedDates = formatDates(plan.data_criacao,plan.data_atualizacao, null, 3);

            return {
                ...plan,
                data_criacao: formattedDates.data_criacao,
                data_atualizacao: formattedDates.data_atualizacao,
            };
        });

        msgJson(201, res, formattedPlanInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar planos.', false)
    }
}


module.exports = {
    register,
    update,
    getAllPlan,
    getPlanById,
    deletePlan
}

