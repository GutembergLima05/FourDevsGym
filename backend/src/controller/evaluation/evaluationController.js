import { msgJson } from "../../utils/responseJson.js"
import { knex } from "../../database/connection/dbConnection.js"
import { formatDates, formatDatesStudent } from "../../service/noticeService.js";

export const register = async (req, res) => {
    const { body } = req
    const { id_administrador, id_aluno } = body
    try {

        const idAluno = await knex('aluno').where({ id_aluno }).returning('*');
        if (!idAluno || idAluno.length === 0 ) return msgJson(404, res, 'Aluno não encontrado.')

        const idAdmin = await knex('administrador').where({ id_adm: id_administrador }).returning('*');
        if (!idAdmin || idAdmin.length === 0 ) return msgJson(404, res, 'Administrador não encontrado.')

        const [ evaluationInfo ] = await knex('avaliacao').insert({...body}).returning('*')

        const formattedDates = formatDates(evaluationInfo.data_criacao,evaluationInfo.data_atualizacao,null,3);
        
        evaluationInfo.nascimento = formattedDates.nascimento;
        evaluationInfo.data_criacao = formattedDates.data_criacao;
        evaluationInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, evaluationInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar avaliação.', false)
    }
}

export const update = async(req, res) => {
    const { params: { id: id_avaliacao }, body } = req
    const { id_aluno, id_administrador } = body

    try {
        const dbInfo = await knex('avaliacao').where({ id_avaliacao }).returning('*');
        if (!dbInfo || dbInfo.length === 0 ) return msgJson(404, res, 'Avaliação não encontrada.')

        const idAluno = await knex('aluno').where({ id_aluno }).returning('*');
        if (!idAluno || idAluno.length === 0 ) return msgJson(404, res, 'Aluno não encontrado.')
    
        const idAdmin = await knex('administrador').where({ id_adm: id_administrador }).returning('*');
        if (!idAdmin || idAdmin.length === 0 ) return msgJson(404, res, 'Administrador não encontrado.')

        const [ evaluationInfo ] = await knex('avaliacao').update({...body}).where({ id_avaliacao }).returning('*')

        const formattedDates = formatDates(evaluationInfo.data_criacao,evaluationInfo.data_atualizacao,null,3);
        
        evaluationInfo.nascimento = formattedDates.nascimento;
        evaluationInfo.data_criacao = formattedDates.data_criacao;
        evaluationInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, evaluationInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao atualizar avaliação.', false)
    }
}

export const deleteEvaluation = async(req, res) => {
    const { params: { id: id_avaliacao }} = req

    try {
        let evaluationInfo = await knex('avaliacao').where({ id_avaliacao }).first().returning('*');
        if (!evaluationInfo || evaluationInfo.length === 0 ) return msgJson(404, res, 'Avaliação não encontrada.')

        const formattedDates = formatDates(evaluationInfo.data_criacao,evaluationInfo.data_atualizacao,null,3);
        
        evaluationInfo.nascimento = formattedDates.nascimento;
        evaluationInfo.data_criacao = formattedDates.data_criacao;
        evaluationInfo.data_atualizacao = formattedDates.data_atualizacao;

        await knex('avaliacao').where({ id_avaliacao }).first().del().returning('*');

        msgJson(201, res, evaluationInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao deletar avaliação.', false)
    }
}

export const getEvaluationById = async(req, res) => {
    const { params: { id: id_avaliacao }} = req

    try {
        const evaluationInfo = await knex('avaliacao').where({ id_avaliacao }).first().returning('*');
        if (!evaluationInfo || evaluationInfo.length === 0 ) return msgJson(404, res, 'Avaliação não encontrada.')

        const formattedDates = formatDates(evaluationInfo.data_criacao,evaluationInfo.data_atualizacao,null,3);
        
        evaluationInfo.nascimento = formattedDates.nascimento;
        evaluationInfo.data_criacao = formattedDates.data_criacao;
        evaluationInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, evaluationInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar avaliação.', false)
    }
}

export const getAllEvaluation = async(req, res) => {
    try {
        const evaluationInfo = await knex('avaliacao').returning('*');
        const formattedEvaluationInfo = evaluationInfo.map(evaluation => {
            const formattedDates = formatDates(evaluation.data_criacao,evaluation.data_atualizacao,null,3);

            return {
                ...evaluation,
                data_criacao: formattedDates.data_criacao,
                data_atualizacao: formattedDates.data_atualizacao,
            };
        });

        msgJson(201, res, formattedEvaluationInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar avaliações.', false)
    }
}


