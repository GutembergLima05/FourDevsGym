const Joi = require('joi');
const dotenv = require('dotenv');

dotenv.config()

const email = Joi.string().email().required(),
    senha = Joi.string().min(8).max(72).required(),
    cargo = Joi.string().valid('recepcionista', 'personal', 'dono').required(),
    descricao = Joi.string().max(100).required(),
    gif_url = Joi.string().required(),
    nome = Joi.string().max(50).required(),
    endereco = Joi.string().max(50).required(),
    data_expiracao = Joi.string().isoDate().required(),
    titulo = Joi.string().max(100).required(),
    dias_validade = Joi.number().integer().positive().required(),
    tipo = Joi.string().max(100).required(),
    valor = Joi.number().positive().required(),
    quantidade = Joi.number().integer().positive().required(),
    metodo_pagamento = Joi.string().max(100).required(),
    obj = Joi.string(),
    idademeta = Joi.number().positive(),
    rcq = Joi.number().positive(),
    tmb = Joi.number().positive(),
    nascimento = Joi.date().iso().required(),
    data_venda = Joi.date().iso().required(),
    id_administrador = Joi.number().integer().positive().required(),
    id_plano = Joi.number().integer().positive().required(),
    id_treino = Joi.number().integer().positive().required(),
    id = Joi.number().integer().positive().required(),
    idOpc = Joi.number().integer().positive(),
    id_academia = Joi.number().integer().positive().required(),
    telefone = Joi.string().required(),
    historico = Joi.string().max(150).required(),
    braco_direito_contraido = Joi.number().positive(),
    braco_esquerdo_contraido = Joi.number().positive(),
    braco_direito_relaxado = Joi.number().positive(),
    braco_esquerdo_relaxado = Joi.number().positive(),
    agua_corporal = Joi.number().positive(),
    torax = Joi.number().positive(),
    altura = Joi.number().positive(),
    peso = Joi.number().positive(),
    gordura_visceral = Joi.number().positive(),
    massa_ossea = Joi.number().positive(),
    cintura = Joi.number().positive(),
    abdomen = Joi.number().positive(),
    quadril = Joi.number().positive(),
    coxa_esquerda = Joi.number().positive(),
    coxa_direita = Joi.number().positive(),
    antebraco_direito = Joi.number().positive(),
    antebraco_esquerdo = Joi.number().positive(),
    key = Joi.string().valid(`${process.env.KEYAPI}`).required(),
    panturrilha_direita = Joi.number().positive(),
    panturrilha_esquerda = Joi.number().positive(),
    id_aluno = Joi.number().integer().positive().required(),
    criaObjJoi = (camposJoiObj) => Joi.object().keys(camposJoiObj).required()

    const dias = Joi.array().items(
        Joi.object({
          id_dia: Joi.number().integer().positive().valid(1,2,3,4,5,6,7).required(),
          exercicios: Joi.array().items(
            Joi.object({
              id_exercicio: Joi.number().integer().positive().required(),
              repeticoes: Joi.number().integer().positive().required(),
              series: Joi.number().integer().positive().required()
            })
          ).min(1).required()
        })
      )

      const s_noticePatch = criaObjJoi({
        titulo: Joi.string().max(100).optional(),
        descricao: Joi.string().max(100).optional(),
        data_expiracao: Joi.string().isoDate().optional(),
        id_academia: Joi.number().integer().positive().optional(),
    });


      module.exports = {
        s_idCheck: criaObjJoi({ id }),
        s_idOpcional: criaObjJoi({ categoria_id: idOpc }),
        s_student: criaObjJoi({ nome, email, nascimento, telefone, endereco, historico, id_academia, id_treino, id_plano }),
        s_notice: criaObjJoi({ titulo, descricao, data_expiracao, id_academia }),
        s_noticePatch,
        s_product: criaObjJoi({ nome, valor, descricao, quantidade, id_academia }),
        s_admSchema: criaObjJoi({ nome, email, senha, cargo, id_academia }),
        s_plan: criaObjJoi({ tipo, valor, dias_validade, id_academia }),
        s_sale: criaObjJoi({ nome, metodo_pagamento, data_venda }),
        s_training: criaObjJoi({ nome, descricao, id_administrador, dias }),
        s_exercise: criaObjJoi({ nome, descricao, id_administrador, gif_url }),
        s_login: criaObjJoi({ email, senha, key }),
        s_gym: criaObjJoi({ nome, endereco }),
        s_evaluation: criaObjJoi({
            braco_direito_contraido,
            braco_direito_relaxado,
            braco_esquerdo_contraido,
            braco_esquerdo_relaxado,
            agua_corporal,
            torax,
            altura,
            peso,
            gordura_visceral,
            massa_ossea,
            cintura,
            abdomen,
            quadril,
            coxa_direita,
            coxa_esquerda,
            antebraco_direito,
            panturrilha_direita,
            panturrilha_esquerda,
            antebraco_esquerdo,
            obj,
            idademeta,
            rcq,
            tmb,
            id_administrador,
            id_aluno
        })
    };