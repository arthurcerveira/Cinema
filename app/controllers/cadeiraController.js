const models = require('../models/cadeirasModel');
const sessaoModel = require('./../models/sessaoModel')
/* const filmeModel = require('../models/filmeModel')
const salaModel = require('./../models/salaModel')
const helper = require('../helpers/helper')
const ingressoModel = require('../models/ingressoModel');
const compraModel = require('../models/compraModel');
const produtoModel = require('../models/produtoModel') */


module.exports = {
    getCadeirasSessao: async (req, res) => {
        try{

            const cadeiras = await models.getCadeirasSessao(req.params.id)

            
            const sessaoData = await sessaoModel.getSessaoId(req.params.id)
            const matrix = []
            let k = -1
            for(let i = 0; i < cadeiras.length; i++){
                if (i % sessaoData[0].colunas === 0){
                    k++
                    matrix[k] = []
                }
                matrix[k].push(cadeiras[i])
            }

            const retorno = {
                cadeiras: matrix,
                sessao: sessaoData[0]
            }

            return res.json(retorno)
        }
        catch (err) {
            return res.json({ error: err.toString() });
        }
    },

    /* buyCadeira: async (req, res) => {
        try{
            if (req.user.admin) {
                return res.status(400).json({ error: 'Você não deveria usar isto' })
            }
            const cadeiras = req.body.cadeiras
            const data_cadeiras = await Promise.all(
                    await cadeiras.map(async cadeira => {
                    const chair = await models.getCadeirasId(cadeira)
                   

                    if(chair[0].status === 4 || chair[0].status === 0){
                        throw new Error('Cadeira já reservada');
                    }

                    const data = {
                        "sessao_id": chair[0].sessao_id,
                        "cadeira_id": chair[0].id,
                        "produto_id": process.env.INGRESSO_ID
                    }

                    const retorno = await ingressoModel.createIngresso(data) 

                    await models.updateCadeirasPlace(chair[0].id, 4)

                    const data_return = {
                        "cadeira": chair[0],
                        //"ingresso":retorno[0].insertId
                    }
                    return data_return

                })
            )
            
            const produtoIngresso = await produtoModel.getProdutoId(process.env.INGRESSO_ID)

            const data = {
                "cliente_id": req.user.id,
                "valor": produtoIngresso[0].valor * cadeiras.length,
                "pontos_retorno": produtoIngresso[0].pontos_retorno * cadeiras.length,
                "pontos_custo": produtoIngresso[0].pontos_custo * cadeiras.length,
                "forma_pagamento": "paypal",
            }

            const compra = await compraModel.createCompras(data)

            const ultraRetorno = {
                id_compra: compra.insertId,
                ingresso: data_cadeiras
            }

            
            return res.json(ultraRetorno)
        }catch (err) {
            return res.status(400).json({ error: err.toString() });
        }
    }, */


    
}