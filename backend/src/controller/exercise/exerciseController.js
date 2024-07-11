const { msgJson } = require("../../utils/responseJson.js")
const { knex } = require("../../database/connection/dbConnection.js")
const { formatDates } = require("../../service/noticeService.js")

const register = async (req, res) => {
    const { body } = req;
    try {
        const [admInfo] = await knex('administrador').where({ id_adm: body.id_administrador }).returning('*');
        if (!admInfo) return msgJson(500, res, 'Administrador não existe!', false);

        const [id] = await knex('exercicio').insert({...body});
        if (!id) return msgJson(500, res, 'Erro ao cadastrar exercício.', false);

        const exerciseInfo = await knex('exercicio').where({ id_exercicio: id }).first();

        if (!exerciseInfo) {
            return msgJson(500, res, 'Erro ao recuperar informações do exercício cadastrado.', false);
        }

        const formattedDates = formatDates(exerciseInfo.data_criacao, exerciseInfo.data_atualizacao, null, 3);
        exerciseInfo.data_criacao = formattedDates.data_criacao;
        exerciseInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, exerciseInfo, true);
    } catch (error) {
        console.log(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar exercício.', false);
    }
};

const update = async(req, res) => {
    const { params: { id: id_exercicio }, body, dataUnique} = req

    try {
        const idInfo = await knex('exercicio').where({ id_exercicio }).returning('*');
        if (!idInfo || idInfo.length === 0 ) return msgJson(404, res, 'Exercicio não encontrado.')

        const [ exerciseInfo ] = await knex('exercicio').update({...body}).where({ id_exercicio }).returning('*')

        const formattedDates = formatDates(exerciseInfo.data_criacao,exerciseInfo.data_atualizacao,null, 3);
        
        exerciseInfo.data_criacao = formattedDates.data_criacao;
        exerciseInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(200, res, exerciseInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao atualizar exercicio.', false)
    }
}

const deleteExercise = async(req, res) => {
    const { params: { id: id_exercicio }} = req

    try {
        let exerciseInfo = await knex('exercicio').where({ id_exercicio }).first().returning('*');
        if (!exerciseInfo || exerciseInfo.length === 0 ) return msgJson(404, res, 'Exercicio não encontrado.')

        const formattedDates = formatDates(exerciseInfo.data_criacao,exerciseInfo.data_atualizacao,null, 3);
        
        exerciseInfo.data_criacao = formattedDates.data_criacao;
        exerciseInfo.data_atualizacao = formattedDates.data_atualizacao;

        await knex('exercicio').where({ id_exercicio }).first().del().returning('*');

        msgJson(200, res, exerciseInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao deletar exercício.', false)
    }
}

const getExerciseById = async(req, res) => {
    const { params: { id: id_exercicio }} = req

    try {
        const exerciseInfo = await knex('exercicio').where({ id_exercicio }).first().returning('*');
        if (!exerciseInfo || exerciseInfo.length === 0 ) return msgJson(404, res, 'Exercício não encontrado.')

        const formattedDates = formatDates(exerciseInfo.data_criacao,exerciseInfo.data_atualizacao,null, 3);
        
        exerciseInfo.data_criacao = formattedDates.data_criacao;
        exerciseInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(200, res, exerciseInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar exercicio.', false)
    }
}

const getAllExercise = async(req, res) => {
    try {
        const exerciseInfo = await knex('exercicio').returning('*');
        const formattedExerciseInfo = exerciseInfo.map(exercise => {
            const formattedDates = formatDates(exercise.data_criacao,exercise.data_atualizacao,null, 3);

            return {
                ...exercise,
                data_criacao: formattedDates.data_criacao,
                data_atualizacao: formattedDates.data_atualizacao,
            };
        });

        msgJson(200, res, formattedExerciseInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar exercícios.', false)
    }
}

module.exports = {
    register,
    update,
    getAllExercise,
    getExerciseById,
    deleteExercise
}
