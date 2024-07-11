const { msgJson } = require('../../utils/responseJson');
const { knex } = require('../../database/connection/dbConnection');
const { formatDates } = require('../../service/noticeService');
const { compare, hash } = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const register = async (req, res) => {
    const { senha } = req.body;
    const { body, dataUnique } = req;

    try {
        if (dataUnique && dataUnique.field) return msgJson(400, res, `O campo '${dataUnique.field}' já está em uso.`, false);

        body.senha = await hash(senha, 10);
        const [admInfo] = await knex('administrador').insert({ ...body }).returning('*');

        const formattedDates = formatDates(admInfo.data_criacao, admInfo.data_atualizacao, null, 3);

        admInfo.data_criacao = formattedDates.data_criacao;
        admInfo.data_atualizacao = formattedDates.data_atualizacao;

        delete admInfo.senha;

        msgJson(201, res, admInfo, true);
    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro interno do servidor ao cadastrar administrador.', false);
    }
};

const update = async (req, res) => {
    const { id: id_adm } = req.params;
    const { body, dataUnique } = req;

    try {
        const dbInfo = await knex('administrador').where({ id_adm }).returning('*');
        if (!dbInfo || dbInfo.length === 0) return msgJson(404, res, 'Administrador não encontrado.');

        if (dataUnique && dataUnique.field && dbInfo[0].email !== dataUnique.idObj.email) {
            return msgJson(400, res, `O campo '${dataUnique.field}' já está em uso.`, false);
        }

        const [admInfo] = await knex('administrador').update({ ...body }).where({ id_adm }).returning('*');

        const formattedDates = formatDates(admInfo.data_criacao, admInfo.data_atualizacao, null, 3);

        admInfo.data_criacao = formattedDates.data_criacao;
        admInfo.data_atualizacao = formattedDates.data_atualizacao;

        delete admInfo.senha;

        msgJson(201, res, admInfo, true);
    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro interno do servidor ao atualizar administrador.', false);
    }
};

const deleteAdm = async (req, res) => {
    const { id: id_adm } = req.params;

    try {
        let admInfo = await knex('administrador').where({ id_adm }).first().returning('*');
        if (!admInfo || admInfo.length === 0) return msgJson(404, res, 'Administrador não encontrado.');

        const formattedDates = formatDates(admInfo.data_criacao, admInfo.data_atualizacao, null, 3);

        admInfo.data_criacao = formattedDates.data_criacao;
        admInfo.data_atualizacao = formattedDates.data_atualizacao;
        delete admInfo.senha;

        await knex('administrador').where({ id_adm }).first().del().returning('*');

        msgJson(201, res, admInfo, true);
    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro interno do servidor ao deletar administrador.', false);
    }
};

const getAllAdm = async (req, res) => {
    try {
        const admInfo = await knex('administrador').returning('*');
        const formattedAdmInfo = admInfo.map((adm) => {
            const formattedDates = formatDates(adm.data_criacao, adm.data_atualizacao, null, 3);
            delete adm.senha;

            return {
                ...adm,
                data_criacao: formattedDates.data_criacao,
                data_atualizacao: formattedDates.data_atualizacao,
            };
        });

        msgJson(201, res, formattedAdmInfo, true);
    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro interno do servidor ao listar administradores.', false);
    }
};

const getAdmById = async (req, res) => {
    const { id: id_adm } = req.params;

    try {
        const admInfo = await knex('administrador').where({ id_adm }).first().returning('*');
        if (!admInfo || admInfo.length === 0) return msgJson(404, res, 'Administrador não encontrado.');

        const formattedDates = formatDates(admInfo.data_criacao, admInfo.data_atualizacao, null, 3);

        admInfo.data_criacao = formattedDates.data_criacao;
        admInfo.data_atualizacao = formattedDates.data_atualizacao;

        delete admInfo.senha;

        msgJson(201, res, admInfo, true);
    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro interno do servidor ao buscar administrador.', false);
    }
};

const login = async (req, res) => {
    const { senha } = req.body;
    const { dataUnique } = req;
    
    try {
        if (!dataUnique) return msgJson(404, res, 'Email ou senha incorretos!', false);
        const { idObj } = dataUnique;

        const senhaValida = await compare(senha, idObj.senha);
        if (!senhaValida) return msgJson(401, res, 'Email ou senha incorretos!', false);

        const [nome_academia] = await knex('academia').where({ id_academia: idObj.id_academia }).returning('nome');

        delete idObj.senha;
        idObj.nome_academia = nome_academia.nome;
        const formattedDates = formatDates(idObj.data_criacao, idObj.data_atualizacao, null, 3);

        idObj.data_criacao = formattedDates.data_criacao;
        idObj.data_atualizacao = formattedDates.data_atualizacao;

        const payload = { ...idObj };
        const options = { expiresIn: '7d' };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);

        msgJson(200, res, { usuario: idObj, token }, true);
    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro interno do servidor ao realizar login.', false);
    }
};

module.exports = {
    register,
    update,
    login,
    getAllAdm,
    getAdmById,
    deleteAdm
}
