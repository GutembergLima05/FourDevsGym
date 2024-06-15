export const msgJson = (statusCode, objRes, msgJson = undefined, success) => {
    const conteudoJson = !msgJson ? null : typeof msgJson === 'object' ? msgJson : { message: msgJson }
    return objRes.status(statusCode).json({conteudoJson, success})
}

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