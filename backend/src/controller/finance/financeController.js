const { msgJson } = require("../../utils/responseJson.js");
const { knex } = require("../../database/connection/dbConnection.js");
const { format } = require("date-fns");
const { ptBR } = require("date-fns/locale");

const getInfoFinance = async (req, res) => {
    try {
        const financeInfo = await knex('financas').select('*');

        const formattedFinanceInfo = financeInfo.map(finance => ({
            ...finance,
            data_ocorrida: format(new Date(finance.data_ocorrida), 'dd/MM/yyyy', { locale: ptBR })
        }));

        msgJson(201, res, formattedFinanceInfo, true);
    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro interno do servidor ao detalhar finanças.', false);
    }
};

module.exports = {
    getInfoFinance
};
