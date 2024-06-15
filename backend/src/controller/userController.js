import { msgJson } from "../utils/responseJson.js";

export const testMsg = async (req, res) => {
    try {

        const user = {
            id: 1,
            nome: 'testando',
            sobrenome: 'tes'
        }

        msgJson(200, res, user)
    } catch (error) {
        msgJson(500, res, 'Erro interno do servidor')
    }
}