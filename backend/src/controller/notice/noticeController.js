import { msgJson } from "../../utils/responseJson.js"
import { knex } from "../../database/connection/dbConnection.js";
import { formatDates } from "../../service/noticeService.js";

export const register = async (req, res) => {
    const { body } = req

    try {
        const [ noticeInfo ] = await knex('aviso').insert({...body}).returning('*')

        const formattedDates = formatDates(noticeInfo.data_criacao,noticeInfo.data_atualizacao,noticeInfo.data_expiracao,3);
        
        noticeInfo.data_criacao = formattedDates.data_criacao;
        noticeInfo.data_atualizacao = formattedDates.data_atualizacao;
        noticeInfo.data_expiracao = formattedDates.data_expiracao;

        msgJson(201, res, noticeInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar aviso.', false)
    }
}