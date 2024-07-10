const { msgJson } = require("../../utils/responseJson.js");
const { knex } = require("../../database/connection/dbConnection.js");
const { formatDates } = require("../../service/noticeService.js");

const register = async (req, res) => {
    const { body } = req;
    const { id_administrador, id_aluno } = body;
    try {
        const idAluno = await knex('aluno').where({ id_aluno }).select('*');
        if (!idAluno || idAluno.length === 0 ) return msgJson(404, res, 'Aluno não encontrado.');

        const idAdmin = await knex('administrador').where({ id_adm: id_administrador }).select('*');
        if (!idAdmin || idAdmin.length === 0 ) return msgJson(404, res, 'Administrador não encontrado.');

        const [ evaluationInfo ] = await knex('avaliacao').insert({...body}).select('*');

        const formattedDatesResult = formatDates(evaluationInfo.data_criacao, evaluationInfo.data_atualizacao, null, 3);
        evaluationInfo.nascimento = formattedDatesResult.nascimento;
        evaluationInfo.data_criacao = formattedDatesResult.data_criacao;
        evaluationInfo.data_atualizacao = formattedDatesResult.data_atualizacao;

        msgJson(201, res, evaluationInfo, true);
    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro interno do servidor ao cadastrar avaliação.', false);
    }
};

const update = async(req, res) => {
    const { params: { id: id_avaliacao }, body } = req;
    const { id_aluno, id_administrador } = body;

    try {
        const dbInfo = await knex('avaliacao').where({ id_avaliacao }).select('*');
        if (!dbInfo || dbInfo.length === 0 ) return msgJson(404, res, 'Avaliação não encontrada.');

        const idAluno = await knex('aluno').where({ id_aluno }).select('*');
        if (!idAluno || idAluno.length === 0 ) return msgJson(404, res, 'Aluno não encontrado.');

        const idAdmin = await knex('administrador').where({ id_adm: id_administrador }).select('*');
        if (!idAdmin || idAdmin.length === 0 ) return msgJson(404, res, 'Administrador não encontrado.');

        const [ evaluationInfo ] = await knex('avaliacao').update({...body}).where({ id_avaliacao }).select('*');

        const formattedDatesResult = formatDates(evaluationInfo.data_criacao, evaluationInfo.data_atualizacao, null, 3);
        evaluationInfo.nascimento = formattedDatesResult.nascimento;
        evaluationInfo.data_criacao = formattedDatesResult.data_criacao;
        evaluationInfo.data_atualizacao = formattedDatesResult.data_atualizacao;

        msgJson(201, res, evaluationInfo, true);
    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro interno do servidor ao atualizar avaliação.', false);
    }
};

const deleteEvaluation = async(req, res) => {
    const { params: { id: id_avaliacao }} = req;

    try {
        let evaluationInfo = await knex('avaliacao').where({ id_avaliacao }).first().select('*');
        if (!evaluationInfo || evaluationInfo.length === 0 ) return msgJson(404, res, 'Avaliação não encontrada.');

        const formattedDatesResult = formatDates(evaluationInfo.data_criacao, evaluationInfo.data_atualizacao, null, 3);
        evaluationInfo.nascimento = formattedDatesResult.nascimento;
        evaluationInfo.data_criacao = formattedDatesResult.data_criacao;
        evaluationInfo.data_atualizacao = formattedDatesResult.data_atualizacao;

        await knex('avaliacao').where({ id_avaliacao }).first().del().select('*');

        msgJson(201, res, evaluationInfo, true);
    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro interno do servidor ao deletar avaliação.', false);
    }
};

const getEvaluationById = async(req, res) => {
    const { params: { id: id_avaliacao }} = req;

    try {
        const evaluationInfo = await knex('avaliacao').where({ id_avaliacao }).first().select('*');
        if (!evaluationInfo || evaluationInfo.length === 0 ) return msgJson(404, res, 'Avaliação não encontrada.');

        const formattedDatesResult = formatDates(evaluationInfo.data_criacao, evaluationInfo.data_atualizacao, null, 3);
        evaluationInfo.nascimento = formattedDatesResult.nascimento;
        evaluationInfo.data_criacao = formattedDatesResult.data_criacao;
        evaluationInfo.data_atualizacao = formattedDatesResult.data_atualizacao;

        msgJson(201, res, evaluationInfo, true);
    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro interno do servidor ao detalhar avaliação.', false);
    }
};

const getAllEvaluation = async(req, res) => {
    try {
        const evaluationInfo = await knex('avaliacao').select('*');
        const formattedEvaluationInfo = evaluationInfo.map(evaluation => {
            const formattedDatesResult = formatDates(evaluation.data_criacao, evaluation.data_atualizacao, null, 3);

            return {
                ...evaluation,
                data_criacao: formattedDatesResult.data_criacao,
                data_atualizacao: formattedDatesResult.data_atualizacao,
            };
        });

        msgJson(201, res, formattedEvaluationInfo, true);
    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro interno do servidor ao detalhar avaliações.', false);
    }
};

module.exports = {
    register,
    update,
    deleteEvaluation,
    getEvaluationById,
    getAllEvaluation
};
