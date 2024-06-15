import Joi from 'joi'

const email = Joi.string().email().max(30).required(),
    senha = Joi.string().min(8).max(72).required(),
    cargo = Joi.string().max(10).required(),
    academia = Joi.string().max(20).required(),
    quantidade_estoque = Joi.number().integer().positive().required(),
    valor = Joi.number().integer().positive().required(),
    categoria_id = Joi.number().integer().positive().required(),
    cpf = Joi.string().required(),
    cep = Joi.string(),
    rua = Joi.string(),
    numero = Joi.string(),
    bairro = Joi.string(),
    cidade = Joi.string(),
    estado = Joi.string(),
    id = Joi.number().integer().positive().required(),
    idOpc = Joi.number().integer().positive(),
    criaObjJoi = (camposJoiObj) => Joi.object().keys(camposJoiObj).required()


export const s_idCheck = criaObjJoi({id})

export const s_idOpcional = criaObjJoi({categoria_id: idOpc})

export const s_admSchema = criaObjJoi({email, senha, cargo, academia })

export const s_login = criaObjJoi({email, senha})