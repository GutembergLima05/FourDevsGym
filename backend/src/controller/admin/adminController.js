import { msgJson } from "../../utils/responseJson.js"
import { knex } from "../../database/connection/dbConnection.js"
import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const register = async (req, res) => {
    const { body: { senha }, body, dataUnique} = req

    try {
        if (dataUnique && dataUnique.field) return msgJson(400, res, `O campo '${dataUnique.field}' com valor '${dataUnique.idObj.email}' já está em uso.`, false);

        body.senha = await hash(senha, 10)
        const [ admInfo ] = await knex('administrador').insert({...body}).returning(['id_adm', 'email','nome','cargo','id_academia'])

        msgJson(201, res, admInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar administrador.', false)
    }
}

export const update = async(req, res) => {
    const { params: { id: id_adm }, body, dataUnique} = req

    try {
        const dbInfo = await knex('administrador').where({ id_adm }).returning('*');
        if (!dbInfo || dbInfo.length === 0 ) return msgJson(404, res, 'Administrador não encontrada.')

        if (dataUnique && dataUnique.field && dbInfo[0].email !== dataUnique.idObj.email) return msgJson(400, res, `O campo '${dataUnique.field}' com valor '${dataUnique.idObj.email}' já está em uso.`, false);

        const [ admInfo ] = await knex('administrador').update({...body}).where({ id_adm }).returning(['id_adm', 'email','nome','cargo','id_academia'])

        msgJson(201, res, admInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar administrador.', false)
    }
}

export const deleteAdm = async(req, res) => {
    const { params: { id: id_adm }} = req

    try {
        let admInfo = await knex('administrador').where({ id_adm }).returning('*');
        if (!admInfo || admInfo.length === 0 ) return msgJson(404, res, 'Administrador não encontrado.', false)

        admInfo = await knex('administrador').where({ id_adm }).del().returning(['id_adm', 'email','nome','cargo','id_academia']);;

        msgJson(201, res, admInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar academia.', false)
    }
}

export const getAllAdm = async (req, res) => {
    try {
        const admInfo = await knex('administrador').select(['id_adm', 'email','nome','cargo','id_academia']);
            
        msgJson(201, res, admInfo, true)
    } catch (error) {
        console.error(error)
         msgJson(500, res, 'Erro interno do servidor ao detalhar academia.', false)
    }
}

export const getAdmById = async (req, res) => {
    const { params: { id: id_adm }} = req

    try {
        const admInfo = await knex('administrador').where({ id_adm }).returning('*');
        if (!admInfo || admInfo.length === 0 ) return msgJson(404, res, 'Administrador não encontrado.', false)

        msgJson(201, res, admInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar administrador.', false)
    }
}

export const login = async (req, res) => {
    const { body: { senha }, dataUnique } = req
    try {
        if(!dataUnique) return msgJson(404, res, 'Email ou senha incorretos!', false)
        const { idObj, idObj: { id } } = dataUnique

        const senhaValida = await compare(senha, idObj.senha)

        if(!senhaValida) return msgJson(401, res, 'Email ou senha incorretos!', false)

        delete idObj.senha

        const payload = { ...idObj }, options = { expiresIn: '7d' }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options)

        msgJson(200, res, {usuario: idObj, token}, true)

    } catch (error) {
        msgJson(500, res, error, false)
    }
}