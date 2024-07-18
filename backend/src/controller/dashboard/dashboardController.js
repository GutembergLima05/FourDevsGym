const { msgJson } = require("../../utils/responseJson.js");
const { knex } = require("../../database/connection/dbConnection.js");

const getInfoDashboard = async (req, res) => {
    try {
        // Verificar e desativar planos expirados ou com id_plano nulo
        await knex('aluno')
            .where(function() {
                this.whereRaw(`plano_ativo = TRUE AND data_inicio_plano + INTERVAL '1 day' * (SELECT dias_validade FROM plano WHERE id_plano = aluno.id_plano) < CURRENT_DATE`)
                    .orWhere('id_plano', null);
            })
            .update({ plano_ativo: false });

        const totalAlunos = await knex('aluno').count();

        // Consulta para quantidade de alunos com plano_ativo false
        const alunosSemPlanoAtivo = await knex('aluno').where({ plano_ativo: false }).count();

        // Consulta para aniversariantes do dia
        const aniversariantes = await knex('aluno')
            .select('nome', knex.raw("TO_CHAR(nascimento, 'DD/MM/YYYY') as nascimento"))
            .whereRaw('EXTRACT(MONTH FROM nascimento) = EXTRACT(MONTH FROM CURRENT_DATE)')
            .andWhereRaw('EXTRACT(DAY FROM nascimento) = EXTRACT(DAY FROM CURRENT_DATE)');

        // Formatar resposta para o dashboard
        const dashboardInfo = {
            total_alunos: totalAlunos[0].count,
            alunos_sem_plano_ativo: alunosSemPlanoAtivo[0].count,
            aniversariantes: aniversariantes
        };

        msgJson(201, res, dashboardInfo, true);
    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro interno do servidor ao detalhar dashboard.', false);
    }
}

module.exports = {
    getInfoDashboard
}
