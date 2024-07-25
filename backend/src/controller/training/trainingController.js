const { msgJson } = require("../../utils/responseJson.js")
const { knex } = require("../../database/connection/dbConnection.js")
const { formatDates } = require("../../service/noticeService.js")

const register = async (req, res) => {
    const { body } = req;
    const { nome, descricao, id_administrador, dias } = body;

    try {
        await knex.transaction(async trx => {
            // Verificação do administrador
            const administrador = await trx('administrador').where({ id_adm: id_administrador }).first();
            if (!administrador) return msgJson(404, res, 'Administrador não encontrado.');

            // Verificação de exercícios
            const id_exercicios = dias.flatMap(dia => dia.exercicios.map(exercicio => exercicio.id_exercicio));
            const exercicios = await trx('exercicio').whereIn('id_exercicio', id_exercicios);

            if (exercicios.length !== id_exercicios.length) {
                const idsExerciciosNaoEncontrados = id_exercicios.filter(id => !exercicios.some(ex => ex.id_exercicio === id));
                return msgJson(404, res, `Exercício(s) não encontrado(s): ${idsExerciciosNaoEncontrados.join(', ')}`);
            }


            // Criação do treino
            const [trainingInfo] = await trx('treino').insert({ nome, descricao, id_administrador }).returning('*');

            // Formatação das datas do treino
            const formattedDates = formatDates(trainingInfo.data_criacao, trainingInfo.data_atualizacao, null, 3);
            trainingInfo.data_criacao = formattedDates.data_criacao;
            trainingInfo.data_atualizacao = formattedDates.data_atualizacao;

            // Inserção dos dias, exercícios, repetições e séries associados
            const inserts = dias.flatMap(dia =>
                dia.exercicios.map(exercicio => ({
                    id_treino: trainingInfo.id_treino,
                    id_dia: dia.id_dia,
                    id_exercicio: exercicio.id_exercicio,
                    repeticoes: exercicio.repeticoes,
                    series: exercicio.series
                }))
            );
            await trx('treino_dia_exercicio').insert(inserts);

            const response = { treino: trainingInfo, dias };
            msgJson(201, res, response, true);
        });
    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro interno do servidor ao cadastrar treino.', false);
    }
};


const update = async (req, res) => {
    const { params: { id: id_treino }, body } = req;
    const { nome, descricao, id_administrador, dias } = body;

    try {
        // Iniciar transação
        await knex.transaction(async trx => {
            // Verificação de administrador
            const administrador = await trx('administrador').where({ id_adm: id_administrador }).first();
            if (!administrador) return msgJson(404, res, 'Administrador não encontrado.');

            // Verificação de treino
            const treinoId = await trx('treino').where({ id_treino }).first();
            if (!treinoId) return msgJson(404, res, 'Treino não encontrado.');

            // Verificação de exercícios
            const id_exercicios = dias.flatMap(dia => dia.exercicios.map(exercicio => exercicio.id_exercicio));
            const exercicios = await trx('exercicio').whereIn('id_exercicio', id_exercicios);

            if (exercicios.length !== id_exercicios.length) {
                const idsExerciciosNaoEncontrados = id_exercicios.filter(id => !exercicios.some(ex => ex.id_exercicio === id));
                return msgJson(404, res, `Exercício(s) não encontrado(s): ${idsExerciciosNaoEncontrados.join(', ')}`);
            }


            // Atualização do treino
            await trx('treino').where({ id_treino }).update({ nome, descricao, id_administrador });

            // Remoção dos relacionamentos antigos
            await trx('treino_dia_exercicio').where({ id_treino }).del();

            // Inserção dos novos relacionamentos
            const inserts = dias.flatMap(dia =>
                dia.exercicios.map(exercicio => ({
                    id_treino,
                    id_dia: dia.id_dia,
                    id_exercicio: exercicio.id_exercicio,
                    repeticoes: exercicio.repeticoes,
                    series: exercicio.series
                }))
            );
            await trx('treino_dia_exercicio').insert(inserts);

            // Obter e formatar as informações do treino
            const treinoInfo = await trx('treino').where({ id_treino }).first();
            const formattedDates = formatDates(treinoInfo.data_criacao, treinoInfo.data_atualizacao, null, 3);
            treinoInfo.data_criacao = formattedDates.data_criacao;
            treinoInfo.data_atualizacao = formattedDates.data_atualizacao;

            // Construção da resposta
            const diasExercicios = await trx('treino_dia_exercicio')
                .join('dia', 'treino_dia_exercicio.id_dia', 'dia.id_dia')
                .join('exercicio', 'treino_dia_exercicio.id_exercicio', 'exercicio.id_exercicio')
                .where('treino_dia_exercicio.id_treino', id_treino)
                .select('dia.id_dia', 'dia.nome as dia_nome', 'exercicio.id_exercicio', 'exercicio.nome as exercicio_nome', 'treino_dia_exercicio.repeticoes', 'treino_dia_exercicio.series');

            const diasMap = diasExercicios.reduce((acc, { id_dia, dia_nome, id_exercicio, exercicio_nome, repeticoes, series }) => {
                if (!acc[id_dia]) {
                    acc[id_dia] = { id_dia, dia_nome, exercicios: [] };
                }
                acc[id_dia].exercicios.push({ id_exercicio, exercicio_nome, repeticoes, series });
                return acc;
            }, {});

            const diasList = Object.values(diasMap);
            const response = { treino: treinoInfo, dias: diasList };

            msgJson(201, res, response, true);
        });
    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro interno do servidor ao atualizar treino.', false);
    }
};


const deleteTraining = async (req, res) => {
    const { params: { id: id_treino } } = req

    try {
        let trainingInfo = await knex('treino').where({ id_treino }).first().returning('*');
        if (!trainingInfo || trainingInfo.length === 0) return msgJson(404, res, 'Treino não encontrado.')

        const formattedDates = formatDates(trainingInfo.data_criacao, trainingInfo.data_atualizacao, null, 3);

        trainingInfo.data_criacao = formattedDates.data_criacao;
        trainingInfo.data_atualizacao = formattedDates.data_atualizacao;

        await knex('treino_dia_exercicio').where({ id_treino }).first().del()

        await knex('treino').where({ id_treino }).first().del()

        msgJson(201, res, trainingInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao deletar treino.', false)
    }
}

const getTrainingById = async (req, res) => {
    const { params: { id: id_treino } } = req;

    try {
        // Verifica se o treino existe
        const trainingInfo = await knex('treino').where({ id_treino }).first();
        if (!trainingInfo) return msgJson(404, res, 'Treino não encontrado.');

        // Busca os dias e exercícios associados ao treino
        const diasExercicios = await knex('treino_dia_exercicio')
            .select('dia.id_dia', 'dia.nome as dia_nome', 'exercicio.id_exercicio', 'exercicio.nome as exercicio_nome', 'exercicio.gif_url', 'treino_dia_exercicio.repeticoes', 'treino_dia_exercicio.series')
            .join('dia', 'treino_dia_exercicio.id_dia', 'dia.id_dia')
            .join('exercicio', 'treino_dia_exercicio.id_exercicio', 'exercicio.id_exercicio')
            .where('treino_dia_exercicio.id_treino', id_treino);

        // Verifique se há exercícios retornados corretamente
        if (diasExercicios.length === 0) {
            return msgJson(404, res, 'Nenhum exercício encontrado para este treino.');
        }

        // Agrupa os exercícios por dia
        const diasMap = diasExercicios.reduce((acc, { id_dia, dia_nome, id_exercicio, exercicio_nome, gif_url, repeticoes, series }) => {
            if (!acc[id_dia]) {
                acc[id_dia] = { id_dia, dia_nome, exercicios: [] };
            }
            acc[id_dia].exercicios.push({ id_exercicio, exercicio_nome, gif_url, repeticoes, series });
            return acc;
        }, {});

        // Constrói a estrutura de dias com exercícios
        const diasList = Object.values(diasMap);

        // Monta a resposta final
        const response = { treino: trainingInfo, dias: diasList };

        msgJson(200, res, response, true);
    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro interno do servidor ao detalhar Treino.');
    }
};



const getAllTraining = async (req, res) => {
    try {
        const trainingInfo = await knex('treino').returning('*');
        const formattedTrainingInfo = trainingInfo.map(training => {
            const formattedDates = formatDates(training.data_criacao, training.data_atualizacao, null, 3);

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


module.exports = {
    register,
    update,
    getAllTraining,
    getTrainingById,
    deleteTraining
}
