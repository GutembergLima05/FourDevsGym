import { msgJson } from "../../utils/responseJson.js"
import { knex } from "../../database/connection/dbConnection.js"
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { formatInTimeZone } from 'date-fns-tz'

export const register = async (req, res) => {
    const { body } = req

    try {
        const [ noticeInfo ] = await knex('aviso').insert({...body}).returning('*')

        const dataAtualizacao = new Date(noticeInfo.data_atualizacao);
        dataAtualizacao.setHours(dataAtualizacao.getHours() - 3);

        noticeInfo.data_criacao = formatInTimeZone(new Date(noticeInfo.data_criacao), 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss', { locale: ptBR } )
        noticeInfo.data_atualizacao = formatInTimeZone(dataAtualizacao, 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
        noticeInfo.data_expiracao = format(new Date(noticeInfo.data_expiracao), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });

        msgJson(201, res, noticeInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar aviso.', false)
    }
}