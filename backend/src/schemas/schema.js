import Joi from 'joi'

const email = Joi.string().email().max(30).required(),
    senha = Joi.string().min(8).max(72).required(),
    nome = Joi.string().max(30).required(),
    descricao = Joi.string().required(),
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


export const s_testSchema = criaObjJoi({nome, senha, email})

export const s_idCheck = criaObjJoi({id})

export const s_idOpcional = criaObjJoi({categoria_id: idOpc})

export const msgError = {
    'any.required': `O campo '$' é obrigatório.`,
    'string.max': `O campo '$' ultrapassou o máximo de caracteres.`,
    'string.email': 'Insira um email valido.',
    'string.min': `O campo '$' não possui o mínino de caracteres.`,
    'string.empty': `O campo '$' não poder estar vazio.`,
    'string.base': `O campo '$' precisar ser uma string.`,
    'number.integer': `Informe um número inteiro no campo '$'.`,
    'number.positive': `Informe um número positivo no campo '$'.`,
    'number.base': `Informe um número valido no campo '$'.`,
    'object.base': `Informe os campos dentro de chaves '{}'.`,
    'object.unknown': `O campo '$' não é permitido.`
}