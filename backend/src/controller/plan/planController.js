const { msgJson } = require("../../utils/responseJson.js")
const { knex } = require("../../database/connection/dbConnection.js")
const { formatDates } = require("../../service/noticeService.js")

const register = async (req, res) => {
    const { body } = req
    try {
        const [ planInfo ] = await knex('plano').insert({...body}).returning('*')

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
        const idInfo = await knex('plano').where({ id_plano }).returning('*');
        if (!idInfo || idInfo.length === 0 ) return msgJson(404, res, 'Plano não encontrado.')

        const [ planInfo ] = await knex('plano').update({...body}).where({ id_plano }).returning('*')

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
        let planInfo = await knex('plano').where({ id_plano }).first().returning('*');
        if (!planInfo || planInfo.length === 0 ) return msgJson(404, res, 'Plano não encontrado.')

        const formattedDates = formatDates(planInfo.data_criacao,planInfo.data_atualizacao, null, 3);
        
        planInfo.data_criacao = formattedDates.data_criacao;
        planInfo.data_atualizacao = formattedDates.data_atualizacao;

        await knex('plano').where({ id_plano }).first().del().returning('*');

        msgJson(201, res, planInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao deletar plano.', false)
    }
}

const getPlanById = async(req, res) => {
    const { params: { id: id_plano }} = req

    try {
        const planInfo = await knex('plano').where({ id_plano }).first().returning('*');
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
        const planInfo = await knex('plano').returning('*');
        const formattedPlanInfo = planInfo.map(plan => {
            const formattedDates = formatDates(plan.data_criacao,plan.data_atualizacao, null, 3);

            return {
                ...plan,
                data_criacao: formattedDates.data_criacao,
                data_atualizacao: formattedDates.data_atualizacao,
            };
        });

       // Para cada plano, contar a quantidade de alunos ativos associados
       for (let i = 0; i < formattedPlanInfo.length; i++) {
        const planoId = formattedPlanInfo[i].id_plano;

        // Consulta para contar alunos associados ao plano com plano_ativo true
        const quantidadeAlunos = await knex('aluno')
            .where('id_plano', planoId)
            .andWhere('plano_ativo', true)
            .count('id_aluno as count')
            .first();

        // Adiciona a quantidade de alunos ao objeto do plano
        formattedPlanInfo[i].quantidade_alunos = quantidadeAlunos.count;
    }

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

