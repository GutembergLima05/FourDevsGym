import { msgJson } from "../../utils/responseJson.js"
import { knex } from "../../database/connection/dbConnection.js"
import { formatDates } from "../../service/noticeService.js";

export const register = async (req, res) => {
    const { body } = req
    try {
        const [ trainingInfo ] = await knex('treino').insert({...body}).returning('*')

        const formattedDates = formatDates(trainingInfo.data_criacao,trainingInfo.data_atualizacao,null,3);
        
        trainingInfo.data_criacao = formattedDates.data_criacao;
        trainingInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, trainingInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar treino.', false)
    }
}

export const update = async(req, res) => {
    const { params: { id: id_treino }, body} = req

    try {
        const idInfo = await knex('treino').where({ id_treino }).returning('*');
        if (!idInfo || idInfo.length === 0 ) return msgJson(404, res, 'Treino não encontrado.')

        const [ trainingInfo ] = await knex('treino').update({...body}).where({ id_treino }).returning('*')

        const formattedDates = formatDates(trainingInfo.data_criacao,trainingInfo.data_atualizacao,null,3);
        
        trainingInfo.data_criacao = formattedDates.data_criacao;
        trainingInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, trainingInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao atualizar treino.', false)
    }
}

export const deleteTraining = async(req, res) => {
    const { params: { id: id_treino }} = req

    try {
        let trainingInfo = await knex('treino').where({ id_treino }).first().returning('*');
        if (!trainingInfo || trainingInfo.length === 0 ) return msgJson(404, res, 'Treino não encontrado.')

        const formattedDates = formatDates(trainingInfo.data_criacao,trainingInfo.data_atualizacao,null,3);
        
        trainingInfo.data_criacao = formattedDates.data_criacao;
        trainingInfo.data_atualizacao = formattedDates.data_atualizacao;

        await knex('treino').where({ id_treino }).first().del().returning('*');

        msgJson(201, res, trainingInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao deletar treino.', false)
    }
}

export const getTrainingById = async(req, res) => {
    const { params: { id: id_treino }} = req

    try {
        const trainingInfo = await knex('treino').where({ id_treino }).first().returning('*');
        if (!trainingInfo || trainingInfo.length === 0 ) return msgJson(404, res, 'Treino não encontrado.')

        const formattedDates = formatDates(trainingInfo.data_criacao,trainingInfo.data_atualizacao,null,3);
        
        trainingInfo.data_criacao = formattedDates.data_criacao;
        trainingInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, trainingInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar Treino.', false)
    }
}

export const getAllTraining = async(req, res) => {
    try {
        const trainingInfo = await knex('treino').returning('*');
        const formattedTrainingInfo = trainingInfo.map(training => {
            const formattedDates = formatDates(training.data_criacao,training.data_atualizacao,null,3);

            return {
                ...training,
                data_criacao: formattedDates.data_criacao,
                data_atualizacao: formattedDates.data_atualizacao,
            };
        });

        msgJson(201, res, formattedTrainingInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar treinos.', false)
    }
}


