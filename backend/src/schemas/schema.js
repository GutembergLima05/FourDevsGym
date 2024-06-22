import Joi from 'joi'

const email = Joi.string().email().max(30).required(),
    senha = Joi.string().min(8).max(72).required(),
    cargo = Joi.string().valid('recepcionista', 'personal', 'dono').required(),
    academia = Joi.string().max(20).required(),
    nome = Joi.string().max(50).required(),
    endereco = Joi.string().max(50).required(),
    cpf = Joi.string().required(),
    cep = Joi.string(),
    rua = Joi.string(),
    numero = Joi.string(),
    bairro = Joi.string(),
    cidade = Joi.string(),
    estado = Joi.string(),
    id = Joi.number().integer().positive().required(),
    idOpc = Joi.number().integer().positive(),
    id_academia = Joi.number().integer().positive().required(),
    criaObjJoi = (camposJoiObj) => Joi.object().keys(camposJoiObj).required()


export const s_idCheck = criaObjJoi({id})

export const s_idOpcional = criaObjJoi({ categoria_id: idOpc })

export const s_admSchema = criaObjJoi({ nome, email, senha, cargo, id_academia })

export const s_login = criaObjJoi({ email, senha })

export const s_gym = criaObjJoi({ nome, endereco })