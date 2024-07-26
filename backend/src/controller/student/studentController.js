const { msgJson } = require("../../utils/responseJson.js")
const { knex } = require("../../database/connection/dbConnection.js")
const { formatDates, formatDatesStudent } = require("../../service/noticeService.js")
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');

const register = async (req, res) => {
    const { body, dataUnique } = req
    const { id_academia, id_treino, id_plano } = body
    try {
        if (dataUnique && dataUnique.field) return msgJson(400, res, `O campo '${dataUnique.field}' já está em uso.`, false);

        const idTreino = await knex('treino').where({ id_treino }).returning('*');
        if (!idTreino || idTreino.length === 0) return msgJson(404, res, 'Treino não encontrado.')

        const idAcademia = await knex('academia').where({ id_academia }).returning('*');
        if (!idAcademia || idAcademia.length === 0) return msgJson(404, res, 'Academia não encontrada.')

        const idPlano = await knex('plano').where({ id_plano }).returning('*');
        if (!idPlano || idPlano.length === 0) return msgJson(404, res, 'Plano não encontrado.')

        const currentDate = new Date().toISOString().split('T')[0];
        body.data_inicio_plano = currentDate;
        body.plano_ativo = true;

        const [studentInfo] = await knex('aluno').insert({ ...body }).returning('*')

        console.log(idPlano)

        const financeInfo = {
            data_ocorrida: currentDate,
            item: idPlano[0].tipo,
            cliente: body.nome,
            valor_pago: idPlano[0].valor
        }
        await knex('financas').insert(financeInfo)

        const formattedDates = formatDatesStudent(studentInfo.data_criacao, studentInfo.data_atualizacao, studentInfo.nascimento, studentInfo.data_inicio_plano, 3);

        studentInfo.nascimento = formattedDates.nascimento;
        studentInfo.data_criacao = formattedDates.data_criacao;
        studentInfo.data_atualizacao = formattedDates.data_atualizacao;
        studentInfo.data_inicio_plano = formattedDates.data_inicio_plano

        msgJson(201, res, studentInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar aluno.', false)
    }
}

const update = async (req, res) => {
    const { params: { id: id_aluno }, body, dataUnique } = req
    const { id_academia, id_treino, id_plano } = body

    try {
        const dbInfo = await knex('aluno').where({ id_aluno }).returning('*');
        if (!dbInfo || dbInfo.length === 0) return msgJson(404, res, 'Aluno não encontrado.')

        if (dataUnique && dataUnique.field && dbInfo[0].email !== dataUnique.idObj.email) return msgJson(400, res, `O campo '${dataUnique.field}' já está em uso.`, false);

        if (id_treino !== null) {
            const idTreino = await knex('treino').where({ id_treino }).returning('*');
            if (!idTreino || idTreino.length === 0) return msgJson(404, res, 'Treino não encontrado.')
        }

        if (id_plano !== null) {
            const idPlano = await knex('plano').where({ id_plano }).returning('*');
            if (!idPlano || idPlano.length === 0) return msgJson(404, res, 'Plano não encontrado.')
        }

        const idAcademia = await knex('academia').where({ id_academia }).returning('*');
        if (!idAcademia || idAcademia.length === 0) return msgJson(404, res, 'Academia não encontrada.')

        const currentPlano = dbInfo[0].id_plano;
        if (currentPlano !== id_plano) {
            // Plano alterado, atualizar data_inicio_plano e plano_ativo
            body.data_inicio_plano = new Date().toISOString().split('T')[0];
            body.plano_ativo = true;

            const currentDate = new Date().toISOString().split('T')[0];
            const financeInfo = {
                data_ocorrida: currentDate,
                item: idPlano[0].tipo,
                cliente: body.nome,
                valor_pago: idPlano[0].valor
            };
            await knex('financas').insert(financeInfo);
        }

        const [studentInfo] = await knex('aluno').update({ ...body }).where({ id_aluno }).returning('*')

        const formattedDates = formatDatesStudent(studentInfo.data_criacao, studentInfo.data_atualizacao, studentInfo.nascimento, studentInfo.data_inicio_plano, 3);

        studentInfo.nascimento = formattedDates.nascimento;
        studentInfo.data_criacao = formattedDates.data_criacao;
        studentInfo.data_atualizacao = formattedDates.data_atualizacao;
        studentInfo.data_inicio_plano = formattedDates.data_inicio_plano;

        msgJson(201, res, studentInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao atualizar aluno.', false)
    }
}

const deleteStudent = async (req, res) => {
    const { params: { id: id_aluno } } = req

    try {
        let studentInfo = await knex('aluno').where({ id_aluno }).first().returning('*');
        if (!studentInfo || studentInfo.length === 0) return msgJson(404, res, 'Aluno não encontrado.')

        const formattedDates = formatDatesStudent(studentInfo.data_criacao, studentInfo.data_atualizacao, studentInfo.nascimento, studentInfo.data_inicio_plano, 3);

        studentInfo.nascimento = formattedDates.nascimento;
        studentInfo.data_criacao = formattedDates.data_criacao;
        studentInfo.data_atualizacao = formattedDates.data_atualizacao;
        studentInfo.data_inicio_plano = formattedDates.data_inicio_plano;

        await knex('aluno').where({ id_aluno }).first().del().returning('*');

        msgJson(201, res, studentInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao deletar aluno.', false)
    }
}

const getStudentById = async (req, res) => {
    const { params: { id: id_aluno } } = req

    try {
        const studentInfo = await knex('aluno').where({ id_aluno }).first().returning('*');
        if (!studentInfo || studentInfo.length === 0) return msgJson(404, res, 'Aluno não encontrado.')

        const formattedDates = formatDatesStudent(studentInfo.data_criacao, studentInfo.data_atualizacao, studentInfo.nascimento, studentInfo.data_inicio_plano, 3);

        studentInfo.nascimento = formattedDates.nascimento;
        studentInfo.data_criacao = formattedDates.data_criacao;
        studentInfo.data_atualizacao = formattedDates.data_atualizacao;
        studentInfo.data_inicio_plano = formattedDates.data_inicio_plano

        msgJson(201, res, studentInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar Aluno.', false)
    }
}

const getAllStudent = async (req, res) => {
    try {
        const studentInfo = await knex('aluno').returning('*');
        const formattedAlunoInfo = studentInfo.map(student => {
            const formattedDates = formatDatesStudent(student.data_criacao, student.data_atualizacao, student.nascimento, student.data_inicio_plano, 3);

            return {
                ...student,
                nascimento: formattedDates.nascimento,
                data_criacao: formattedDates.data_criacao,
                data_atualizacao: formattedDates.data_atualizacao,
                data_inicio_plano: formattedDates.data_inicio_plano
            };
        });

        msgJson(201, res, formattedAlunoInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar alunos.', false)
    }
}

const login = async (req, res) => {
    const { matricula: id_aluno, nascimento } = req.body;

    try {
        const alunoInfo = await knex('aluno')
            .where({ id_aluno, nascimento })
            .first();

        if (!alunoInfo) {
            return msgJson(404, res, 'Matrícula ou nascimento incorretos!', false);
        }

        const academiaInfo = await knex('academia')
            .where({ id_academia: alunoInfo.id_academia })
            .select('nome')
            .first();


        alunoInfo.nome_academia = academiaInfo.nome;
        alunoInfo.cargo = 'aluno';

        const formattedDates = formatDates(alunoInfo.data_criacao, alunoInfo.data_atualizacao, null, 3);

        alunoInfo.nascimento = format(new Date(alunoInfo.nascimento), 'dd/MM/yyyy');
        alunoInfo.data_inicio_plano = alunoInfo.data_inicio_plano ? format(new Date(alunoInfo.data_inicio_plano), 'dd/MM/yyyy') : null;

        alunoInfo.data_criacao = formattedDates.data_criacao;
        alunoInfo.data_atualizacao = formattedDates.data_atualizacao;

        const payload = { ...alunoInfo };
        const options = { expiresIn: '7d' };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);

        msgJson(200, res, { usuario: alunoInfo, token }, true);
    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro interno do servidor ao realizar login.', false);
    }
};


module.exports = {
    register,
    update,
    getAllStudent,
    getStudentById,
    deleteStudent,
    login
}

