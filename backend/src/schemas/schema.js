import Joi from 'joi'

const email = Joi.string().email().max(30).required(),
    senha = Joi.string().min(8).max(72).required(),
    cargo = Joi.string().valid('recepcionista', 'personal', 'dono').required(),
    descricao = Joi.string().max(100).required(),
    gif_url = Joi.string().max(100).required(),
    nome = Joi.string().max(50).required(),
    endereco = Joi.string().max(50).required(),
    data_expiracao = Joi.string().isoDate().required(),
    titulo = Joi.string().max(100).required(),
    tipo = Joi.string().max(100).required(),
    valor = Joi.number().positive().required(),
    quantidade = Joi.number().integer().positive().required(),
    id_dia = Joi.number().integer().positive().required(),
    id_exercicios = Joi.array().items(Joi.number().integer().positive()).required(),
    id_administrador = Joi.number().integer().positive().required(),
    id = Joi.number().integer().positive().required(),
    idOpc = Joi.number().integer().positive(),
    id_academia = Joi.number().integer().positive().required(),
    criaObjJoi = (camposJoiObj) => Joi.object().keys(camposJoiObj).required()


export const s_idCheck = criaObjJoi({id})

export const s_idOpcional = criaObjJoi({ categoria_id: idOpc })

export const s_notice = criaObjJoi({ titulo, descricao, data_expiracao, id_academia })

export const s_product = criaObjJoi({ nome, valor, descricao, quantidade, id_academia})

export const s_admSchema = criaObjJoi({ nome, email, senha, cargo, id_academia })

export const s_plan = criaObjJoi({ tipo, valor, id_academia})

export const s_training = criaObjJoi({ nome, descricao, id_administrador, id_dia, id_exercicios })

export const s_exercise = criaObjJoi({ nome, descricao, id_administrador, gif_url })

export const s_login = criaObjJoi({ email, senha })

export const s_gym = criaObjJoi({ nome, endereco })