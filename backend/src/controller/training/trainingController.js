import { msgJson } from "../../utils/responseJson.js"
import { knex } from "../../database/connection/dbConnection.js"
import { formatDates } from "../../service/noticeService.js";

export const register = async (req, res) => {
    const { body } = req
    const { nome, descricao, id_administrador, id_dia, id_exercicios } = body;
    const id_adm  = id_administrador
    try {

        const [idAdministrador, idDia] = await Promise.all([
            knex('administrador').where({ id_adm }).returning('*'),
            knex('dia').where({ id_dia }).returning('*').first(),
        ]);

        const exerciciosPromises = id_exercicios.map(id_exercicio => knex('exercicio').where({ id_exercicio }).first());
        const exercicios = await Promise.all(exerciciosPromises);
        if (exercicios.some(exercicio => !exercicio)) {
            const idsExerciciosNaoEncontrados = id_exercicios.filter(id => !exercicios.find(ex => ex && ex.id_exercicio === id));
            return msgJson(404, res, `Exercício(s) não encontrado(s): ${idsExerciciosNaoEncontrados.join(', ')}`);
        }

        if (!idAdministrador || idAdministrador.length === 0 ) return msgJson(404, res, 'Administrador não encontrado.')
        if (!idDia || idDia.length === 0 ) return msgJson(404, res, 'Dia não encontrado.')

        const [ trainingInfo ] = await knex('treino').insert({nome, descricao, id_administrador}).returning('*')

        const formattedDates = formatDates(trainingInfo.data_criacao,trainingInfo.data_atualizacao,null,3);
        
        trainingInfo.data_criacao = formattedDates.data_criacao;
        trainingInfo.data_atualizacao = formattedDates.data_atualizacao;

        await knex('treino_dia').insert({
            id_treino: trainingInfo.id_treino,
            id_dia: id_dia
        });

        for (const id_exercicio of id_exercicios) {
            await knex('exercicio_treino').insert({
                id_treino: trainingInfo.id_treino,
                id_exercicio: id_exercicio
            });
        }

    const exerciciosList = await knex('exercicio')
    .join('exercicio_treino', 'exercicio.id_exercicio', 'exercicio_treino.id_exercicio')
    .where('exercicio_treino.id_treino', trainingInfo.id_treino)
    .select('exercicio.*');


        const response = { treino: trainingInfo, dia: idDia, exercicios: exerciciosList };

        msgJson(201, res, response, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar treino.', false)
    }
}

export const update = async(req, res) => {
    const { params: { id: id_treino }, body } = req
    const { nome, descricao, id_administrador, id_dia, id_exercicios } = body;
    const id_adm  = id_administrador

    try {
        const [idAdministrador, idTreinoInfo, idDia, treinoDiaExists] = await Promise.all([
            knex('administrador').where({ id_adm }).returning('*'),
            knex('treino').where({ id_treino }).returning('*').first(),
            knex('dia').where({ id_dia }).returning('*').first(),
            knex('treino_dia').where({ id_treino, id_dia }).first()
        ]);

        for (let id_exercicio of id_exercicios) {
            const exercicioTreinoExists = await knex('exercicio_treino').where({ id_treino, id_exercicio }).first();
            if (!exercicioTreinoExists) {
                return msgJson(400, res, `O exercício ${id_exercicio} e o treino ${id_treino} não está vinculado ao treino na tabela exercicio_treino.`);
            }
        }

        const exerciciosPromises = id_exercicios.map(id_exercicio => knex('exercicio').where({ id_exercicio }).first());
        const exercicios = await Promise.all(exerciciosPromises);
        if (exercicios.some(exercicio => !exercicio)) {
            const idsExerciciosNaoEncontrados = id_exercicios.filter(id => !exercicios.find(ex => ex && ex.id_exercicio === id));
            return msgJson(404, res, `Exercício(s) não encontrado(s): ${idsExerciciosNaoEncontrados.join(', ')}`);
        }
        if (!treinoDiaExists || treinoDiaExists.length === 0) return msgJson(400, res, 'Não há relação válida na tabela treino_dia para este treino e dia.');    
        if (!idAdministrador || idAdministrador.length === 0 ) return msgJson(404, res, 'Administrador não encontrado.')
        if (!idTreinoInfo || idTreinoInfo.length === 0 ) return msgJson(404, res, 'Treino não encontrado.')
        if (!idDia || idDia.length === 0 ) return msgJson(404, res, 'Dia não encontrado.')

        const formattedDates = formatDates(idTreinoInfo.data_criacao, idTreinoInfo.data_atualizacao, null, 3);
        idTreinoInfo.data_criacao = formattedDates.data_criacao;
        idTreinoInfo.data_atualizacao = formattedDates.data_atualizacao

        await knex('treino').where(idTreinoInfo.id_treino).update({nome, descricao, id_administrador})

        await knex('treino_dia').where(treinoDiaExists).update({
            id_treino: idTreinoInfo.id_treino,
            id_dia: id_dia
        });

        for (const id_exercicio of id_exercicios) {
            await knex('exercicio_treino').where({id_treino: idTreinoInfo.id_treino, id_exercicio: id_exercicio}).update({
                id_treino: idTreinoInfo.id_treino,
                id_exercicio: id_exercicio
            });
        }

    const exerciciosList = await knex('exercicio')
    .join('exercicio_treino', 'exercicio.id_exercicio', 'exercicio_treino.id_exercicio')
    .where('exercicio_treino.id_treino', id_treino)
    .select('exercicio.*');


        const response = { treino: idTreinoInfo, dia: idDia, exercicios: exerciciosList };

        msgJson(201, res, response, true)
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

        await knex('treino_dia').where({ id_treino }).first().del()
        await knex('exercicio_treino').where({ id_treino }).first().del()

        await knex('treino').where({ id_treino }).first().del()

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

        const diaInfo = await knex('treino_dia').where({ id_treino }).select('id_dia')
        const exerciciosList = await knex('exercicio')
    .join('exercicio_treino', 'exercicio.id_exercicio', 'exercicio_treino.id_exercicio')
    .where('exercicio_treino.id_treino', id_treino)
    .select('exercicio.*');

    const response = { treino: trainingInfo, dia: diaInfo, exercicios: exerciciosList };

        msgJson(201, res, response, true)
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


