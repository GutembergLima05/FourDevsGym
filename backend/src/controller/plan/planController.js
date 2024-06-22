import { msgJson } from "../../utils/responseJson.js"
import { knex } from "../../database/connection/dbConnection.js"
import { formatDates } from "../../service/noticeService.js";

export const register = async (req, res) => {
    const { body } = req
    try {
        const [ planInfo ] = await knex('plano').insert({...body}).returning('*')

        const formattedDates = formatDates(planInfo.data_criacao,planInfo.data_atualizacao,3);
        
        planInfo.data_criacao = formattedDates.data_criacao;
        planInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, planInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar plano.', false)
    }
}

export const update = async(req, res) => {
    const { params: { id: id_plano }, body} = req

    try {
        const idInfo = await knex('plano').where({ id_plano }).returning('*');
        if (!idInfo || idInfo.length === 0 ) return msgJson(404, res, 'Plano não encontrado.')

        const [ planInfo ] = await knex('plano').update({...body}).where({ id_plano }).returning('*')

        const formattedDates = formatDates(planInfo.data_criacao,planInfo.data_atualizacao,3);
        
        planInfo.data_criacao = formattedDates.data_criacao;
        planInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, planInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao atualizar plano.', false)
    }
}

export const deletePlan = async(req, res) => {
    const { params: { id: id_plano }} = req

    try {
        let planInfo = await knex('plano').where({ id_plano }).first().returning('*');
        if (!planInfo || planInfo.length === 0 ) return msgJson(404, res, 'Plano não encontrado.')

        const formattedDates = formatDates(planInfo.data_criacao,planInfo.data_atualizacao,3);
        
        planInfo.data_criacao = formattedDates.data_criacao;
        planInfo.data_atualizacao = formattedDates.data_atualizacao;

        await knex('plano').where({ id_plano }).first().del().returning('*');

        msgJson(201, res, planInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao deletar plano.', false)
    }
}

export const getPlanById = async(req, res) => {
    const { params: { id: id_plano }} = req

    try {
        const planInfo = await knex('plano').where({ id_plano }).first().returning('*');
        if (!planInfo || planInfo.length === 0 ) return msgJson(404, res, 'Plano não encontrado.')

        const formattedDates = formatDates(planInfo.data_criacao,planInfo.data_atualizacao,3);
        
        planInfo.data_criacao = formattedDates.data_criacao;
        planInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, planInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar plano.', false)
    }
}

export const getAllPlan = async(req, res) => {
    try {
        const planInfo = await knex('plano').returning('*');
        const formattedPlanInfo = planInfo.map(plan => {
            const formattedDates = formatDates(plan.data_criacao,plan.data_atualizacao,3);

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


