import { msgJson } from "../../utils/responseJson.js"
import { knex } from "../../database/connection/dbConnection.js"
import { formatDates } from "../../service/noticeService.js";

export const register = async (req, res) => {
    const { body } = req
    try {
        const [ productInfo ] = await knex('produto').insert({...body}).returning('*')

        const formattedDates = formatDates(productInfo.data_criacao,productInfo.data_atualizacao,3);
        
        productInfo.data_criacao = formattedDates.data_criacao;
        productInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, productInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar produto.', false)
    }
}

export const update = async(req, res) => {
    const { params: { id: id_produto }, body} = req

    try {
        const idInfo = await knex('produto').where({ id_produto }).returning('*');
        if (!idInfo || idInfo.length === 0 ) return msgJson(404, res, 'Produto não encontrado.')

        const [ productInfo ] = await knex('produto').update({...body}).where({ id_produto }).returning('*')

        const formattedDates = formatDates(productInfo.data_criacao,productInfo.data_atualizacao,3);
        
        productInfo.data_criacao = formattedDates.data_criacao;
        productInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, productInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao atualizar produto.', false)
    }
}

export const deleteStudent = async(req, res) => {
    const { params: { id: id_produto }} = req

    try {
        let productInfo = await knex('produto').where({ id_produto }).first().returning('*');
        if (!productInfo || productInfo.length === 0 ) return msgJson(404, res, 'Produto não encontrado.')

        const formattedDates = formatDates(productInfo.data_criacao,productInfo.data_atualizacao,3);
        
        productInfo.data_criacao = formattedDates.data_criacao;
        productInfo.data_atualizacao = formattedDates.data_atualizacao;

        await knex('produto').where({ id_produto }).first().del().returning('*');

        msgJson(201, res, productInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao deletar produto.', false)
    }
}

export const getStudentById = async(req, res) => {
    const { params: { id: id_produto }} = req

    try {
        const productInfo = await knex('produto').where({ id_produto }).first().returning('*');
        if (!productInfo || productInfo.length === 0 ) return msgJson(404, res, 'Produto não encontrado.')

        const formattedDates = formatDates(productInfo.data_criacao,productInfo.data_atualizacao,3);
        
        productInfo.data_criacao = formattedDates.data_criacao;
        productInfo.data_atualizacao = formattedDates.data_atualizacao;

        msgJson(201, res, productInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar Produto.', false)
    }
}

export const getAllStudent = async(req, res) => {
    try {
        const productInfo = await knex('produto').returning('*');
        const formattedProductInfo = productInfo.map(product => {
            const formattedDates = formatDates(product.data_criacao,product.data_atualizacao,3);

            return {
                ...product,
                data_criacao: formattedDates.data_criacao,
                data_atualizacao: formattedDates.data_atualizacao,
            };
        });

        msgJson(201, res, formattedProductInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar produtos.', false)
    }
}


