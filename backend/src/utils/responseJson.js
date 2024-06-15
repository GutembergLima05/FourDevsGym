export const msgJson = (statusCode, objRes, msgJson = undefined) => {
    const conteudoJson = !msgJson ? null : typeof msgJson === 'object' ? msgJson : { message: msgJson }
    return objRes.status(statusCode).json(conteudoJson)
}