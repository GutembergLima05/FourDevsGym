const { msgJson } = require( "../../utils/responseJson.js")
const { knex } = require( "../../database/connection/dbConnection.js")
const { formatDates, formatDatesStudent } = require( "../../service/noticeService.js")

const register = async (req, res) => {
    const { body, dataUnique } = req
    const { id_academia, id_treino, id_plano } = body
    try {
        if (dataUnique && dataUnique.field) return msgJson(400, res, `O campo '${dataUnique.field}' já está em uso.`, false);

        const idTreino = await knex('treino').where({ id_treino }).returning('*');
        if (!idTreino || idTreino.length === 0 ) return msgJson(404, res, 'Treino não encontrado.')

        const idAcademia = await knex('academia').where({ id_academia }).returning('*');
        if (!idAcademia || idAcademia.length === 0 ) return msgJson(404, res, 'Academia não encontrada.')

        const idPlano = await knex('plano').where({ id_plano }).returning('*');
        if (!idPlano || idPlano.length === 0 ) return msgJson(404, res, 'Plano não encontrado.')

        const [ studentInfo ] = await knex('aluno').insert({...body}).returning('*')

        const formattedDates = formatDatesStudent(studentInfo.data_criacao,studentInfo.data_atualizacao, studentInfo.nascimento,3);
        
        studentInfo.nascimento = formattedDates.nascimento;
        studentInfo.data_criacao = formattedDates.data_criacao;
        studentInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, studentInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar aluno.', false)
    }
}

const update = async(req, res) => {
    const { params: { id: id_aluno }, body, dataUnique} = req
    const { id_academia, id_treino, id_plano } = body

    try {
        const dbInfo = await knex('aluno').where({ id_aluno }).returning('*');
        if (!dbInfo || dbInfo.length === 0 ) return msgJson(404, res, 'Aluno não encontrado.')

        if (dataUnique && dataUnique.field && dbInfo[0].email !== dataUnique.idObj.email) return msgJson(400, res, `O campo '${dataUnique.field}' já está em uso.`, false);
        
        const idTreino = await knex('treino').where({ id_treino }).returning('*');
        if (!idTreino || idTreino.length === 0 ) return msgJson(404, res, 'Treino não encontrado.')

        const idAcademia = await knex('academia').where({ id_academia }).returning('*');
        if (!idAcademia || idAcademia.length === 0 ) return msgJson(404, res, 'Academia não encontrada.')

        const idPlano = await knex('plano').where({ id_plano }).returning('*');
        if (!idPlano || idPlano.length === 0 ) return msgJson(404, res, 'Plano não encontrado.')

        const [ studentInfo ] = await knex('aluno').update({...body}).where({ id_aluno }).returning('*')

        const formattedDates = formatDatesStudent(studentInfo.data_criacao,studentInfo.data_atualizacao, studentInfo.nascimento,3);
        
        studentInfo.nascimento = formattedDates.nascimento;
        studentInfo.data_criacao = formattedDates.data_criacao;
        studentInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, studentInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao atualizar aluno.', false)
    }
}

const deleteStudent = async(req, res) => {
    const { params: { id: id_aluno }} = req

    try {
        let studentInfo = await knex('aluno').where({ id_aluno }).first().returning('*');
        if (!studentInfo || studentInfo.length === 0 ) return msgJson(404, res, 'Aluno não encontrado.')

        const formattedDates = formatDatesStudent(studentInfo.data_criacao,studentInfo.data_atualizacao, studentInfo.nascimento,3);
        
        studentInfo.nascimento = formattedDates.nascimento;
        studentInfo.data_criacao = formattedDates.data_criacao;
        studentInfo.data_atualizacao = formattedDates.data_atualizacao;

        await knex('aluno').where({ id_aluno }).first().del().returning('*');

        msgJson(201, res, studentInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao deletar aluno.', false)
    }
}

const getStudentById = async(req, res) => {
    const { params: { id: id_aluno }} = req

    try {
        const studentInfo = await knex('aluno').where({ id_aluno }).first().returning('*');
        if (!studentInfo || studentInfo.length === 0 ) return msgJson(404, res, 'Aluno não encontrado.')

        const formattedDates = formatDatesStudent(studentInfo.data_criacao,studentInfo.data_atualizacao, studentInfo.nascimento,3);
        
        studentInfo.nascimento = formattedDates.nascimento;
        studentInfo.data_criacao = formattedDates.data_criacao;
        studentInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, studentInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar Aluno.', false)
    }
}

const getAllStudent = async(req, res) => {
    try {
        const studentInfo = await knex('aluno').returning('*');
        const formattedAlunoInfo = studentInfo.map(student => {
            const formattedDates = formatDatesStudent(student.data_criacao,student.data_atualizacao, student.nascimento,3);

            return {
                ...student,
                nascimento: formattedDates.nascimento,
                data_criacao: formattedDates.data_criacao,
                data_atualizacao: formattedDates.data_atualizacao,
            };
        });

        msgJson(201, res, formattedAlunoInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar alunos.', false)
    }
}


module.exports = {
    register,
    update,
    getAllStudent,
    getStudentById,
    deleteStudent
}

