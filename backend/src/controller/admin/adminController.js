import { msgJson } from "../../utils/responseJson.js"
import { knex } from "../../database/connection/dbConnection.js"
import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { body: { senha }, body, dataUnique} = req

    try {
        if (dataUnique && dataUnique.field) return msgJson(400, res, `O campo '${dataUnique.field}' com valor '${dataUnique.idObj.nome}' já está em uso.`, false);

        body.senha = await hash(senha, 10)
        const [ admInfo ] = await knex('administrador').insert({...body}).returning(['id_adm', 'email','nome','cargo','id_academia'])

        msgJson(201, res, admInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar academia.', false)
    }
}

export const login = async (req, res) => {
    const { body: { senha }, idUnique } = req
    try {
        if(!idUnique) return msgJson(404, res, 'Email não cadastrado', false)
        const { idObj, idObj: { id } } = idUnique

        const senhaValida = await compare(senha, idObj.senha)
        if(!senhaValida) return msgJson(401, res, 'Senha incorreta', false)

        delete idObj.senha

        const payload = { id }, options = { expiresIn: '7d' }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options)

        msgJson(200, res, {usuario: idObj, token}, true)

    } catch (error) {
        msgJson(500, res, error, false)
    }
}