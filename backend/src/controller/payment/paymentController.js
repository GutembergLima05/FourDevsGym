const axios = require('axios');
const { knex } = require("../../database/connection/dbConnection.js")
const { msgJson } = require("../../utils/responseJson.js");
const dotenv = require('dotenv');

dotenv.config();

const createPixPayment = async (req, res) => {
    const { id_aluno, id_plano } = req.body;

    try {
        const aluno = await knex('aluno').where({ id_aluno }).first();
        const plano = await knex('plano').where({ id_plano }).first();

        if (!aluno) return msgJson(404, res, 'Aluno não encontrado.');
        if (!plano) return msgJson(404, res, 'Plano não encontrado.');

        const payload = {
            transaction_amount: plano.valor,
            description: plano.tipo,
            payment_method_id: 'pix',
            payer: {
                email: "devsfour4@gmail.com",
                first_name: 'Four',
                last_name: 'Devs',
                identification: {
                    type: 'CPF',
                    number: "444.444.444-44"
                }
            }
        };


        const response = await axios.post('https://api.mercadopago.com/v1/payments', payload, {
            headers: {
                'Authorization': process.env.PIX_CONFIG,
                'Content-Type': 'application/json'
            }
        });

        const paymentData = response.data;

        await knex('pagamentos').insert({
            id_pagamento: paymentData.id,
            copia_cola: paymentData.point_of_interaction.transaction_data.qr_code,
            id_aluno: id_aluno,
            id_plano: id_plano,
            status: paymentData.status
        });

        msgJson(201, res, {
            id_pagamento: paymentData.id,
            copia_cola: paymentData.point_of_interaction.transaction_data.qr_code,
            status: paymentData.status
        }, true);

    } catch (error) {
        console.error(error);
        msgJson(500, res, 'Erro ao criar pagamento PIX.', false);
    }
};

const checkPaymentStatus = async (req, res) => {
    const { id_pagamento } = req.params;

    try {

        const paymentInfo = await knex('pagamentos').where({ id_pagamento }).first();
        if (!paymentInfo) return msgJson(404, res, 'ID de Pagamento não encontrado.');

        const response = await axios.get(`https://api.mercadopago.com/v1/payments/${id_pagamento}`, {
            headers: {
                'Authorization': process.env.PIX_CONFIG
            }
        });

        const paymentData = response.data;
        const paymentStatus = paymentData.status;

        await knex('pagamentos')
            .where({ id_pagamento })
            .update({ status: paymentStatus });

        // Se o pagamento estiver confirmado, atualizar o plano do aluno
        if (paymentStatus === 'approved') {
            const aluno = await knex('aluno').where({ id_aluno: paymentInfo.id_aluno }).first();
            const plano = await knex('plano').where({ id_plano: paymentInfo.id_plano }).first();
            const currentDate = new Date().toISOString().split('T')[0]

            if (!aluno) return msgJson(404, res, 'Aluno não encontrado.');
            if (!plano) return msgJson(404, res, 'Plano não encontrado.');

            await knex('aluno')
                .where({ id_aluno: aluno.id_aluno })
                .update({
                    id_plano: plano.id_plano,
                    plano_ativo: true,
                    data_inicio_plano: currentDate
                });

            const financeInfo = {
                data_ocorrida: currentDate,
                item: plano.tipo,
                cliente: aluno.nome,
                valor_pago: plano.valor
            }
            await knex('financas').insert(financeInfo)

            msgJson(200, res, { message: "Pagamento aprovado", status: `${paymentStatus}` }, true);
        } else {
            msgJson(200, res, { message: "Pagamento pendente", status: `${paymentStatus}` }, true);
        }
    } catch (error) {
        console.error(error);
        if (error.response.status === 404) {
            return msgJson(400, res, 'ID de Pagamento não encontrado!', false);
        }
        msgJson(500, res, 'Erro ao verificar status do pagamento.', false);
    }
};


module.exports = { createPixPayment, checkPaymentStatus };

