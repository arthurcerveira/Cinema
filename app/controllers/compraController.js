const model = require('../models/compraModel');
const model_product = require('../models/produtoModel');
const model_cliente = require('../models/clienteModel');
const ingressoModel = require('../models/ingressoModel');
const cadeiraModel = require('../models/cadeirasModel');
const env = require('dotenv')

env.config()

module.exports = {
    getCompras: async (req, res) => {
        try {

            if(req.query.limit && req.query.offset)
                return res.json(await model.getComprasPag(req.query.limit, req.query.offset))

            const retorno = await model.getCompras() 
            return res.json(retorno)
        } catch (err) {
            return res.status(400).json({ error: err.toString() })
        }
    },

    getComprasId: async (req, res) => {
        try {
            const retorno = await model.getComprasId(req.params.id) 
            return res.json(retorno[0])
        } catch (err) {
            return res.status(400).json({ error: err.toString() })
        }
    },

    createCompra: async (req, res) => {
        try {
            if (req.user.admin) {
                return res.status(400).json({ error: 'Você não deveria usar isto' })
            }
            const produtos = req.body.products
            const data_products = await Promise.all(
                    await produtos.map(async produto => {
                    const product = await model_product.getProdutoId(produto)
                    return product[0]
                })
            )

            const cadeiras = req.body.chairs
            const data_cadeiras = await Promise.all(
                    await cadeiras.map(async cadeira => {
                    const chair = await cadeiraModel.getCadeirasId(cadeira)
                    if(chair[0].status === 4 || chair[0].status === 0){
                        throw new Error('Cadeira já reservada');
                    }
                    const data = {
                        "sessao_id": chair[0].sessao_id,
                        "cadeira_id": chair[0].id,
                        "produto_id": process.env.INGRESSO_ID
                    }
                    const retorno = await ingressoModel.createIngresso(data) 

                    await cadeiraModel.updateCadeirasPlace(chair[0].id, 4)

                    
                    return chair[0]

                })
            )
            const produtoIngresso = await model_product.getProdutoId(process.env.INGRESSO_ID)
            
            const sum_valor = await Promise.resolve( 
                data_products.reduce(async (accumulator, product) => {
                    
                    const data = {
                        valor: accumulator.valor + product.valor,
                        pontos_retorno: accumulator.pontos_retorno + product.pontos_retorno,
                        pontos_custo: accumulator.pontos_custo + product.pontos_custo
                    }
                    return data
                }) 
            ) 
            const data = {
                valor: sum_valor.valor + produtoIngresso[0].valor * data_cadeiras.length,
                pontos_retorno: sum_valor.pontos_retorno + produtoIngresso[0].pontos_retorno * data_cadeiras.length,
                pontos_custo: sum_valor.pontos_custo + produtoIngresso[0].pontos_custo * data_cadeiras.length,
                cliente_id: req.user.id,
                forma_pagamento: 'Pendente'
            }

            const retorno = await model.createCompras(data) 
            return res.json({'status': 'success', 'id_compra': retorno.insertId, 'compra': data, 'produtos':data_products, 'ingressos': data_cadeiras,})
        } catch (err) {
            return res.status(400).json({ error: err.toString() })
        }
    },

    updateCompra: async (req, res) => {
        try {
            const retorno = await model.updateCompras(req.body, req.params.id) 
            return res.json({'status':'success'})
        } catch (err) {
            return res.status(400).json({ error: err.toString() })
        }
    },

    deleteCompra: async (req, res) => {
        try {
            await model.deleteCompras(req.params.id) 
            return res.json({'status':'success'})
        } catch (err) {
            return res.status(400).json({ error: err.toString() })
        }
    },

    getComprasByClienteUser: async (req, res) => {
        try {
            const retorno = await model.getComprasByCliente(req.user.id) 
            return res.json(retorno)
        } catch (err) {
            return res.status(400).json({ error: err.toString() })
        }
    },

    payCompra: async (req, res) => {
        try {
            if( req.user.admin ){
                return res.status(400).json({ error: 'Você não deveria usar isto' })
            }
            const retorno = await model.getComprasId(req.params.id) 

            if (retorno[0].cliente_id != req.user.id) {
                return res.status(400).json({ error: 'Você não deveria usar isto' })
            }
            if (retorno[0].pagamento_pendente == 0) {
                return res.status(400).json({ error: 'Você já pagou essa compra' })
            }

            if (req.body.pagamento == 'pontos') {
                const cliente = await model_cliente.getClienteId(req.user.id)
                if( retorno[0].pontos_custo <= cliente[0].pontos){
                    const data = {
                        pagamento_pendente: 0,
                        pontos_retorno: retorno[0].pontos_retorno,
                        pontos_custo: retorno[0].pontos_custo,
                        forma_pagamento: 'pontos',
                        valor: retorno[0].valor,
                        cliente_id: retorno[0].cliente_id
                    }
                    await model.updateCompras(data, req.params.id)


                    const pontos = cliente[0].pontos - retorno[0].pontos_custo
                    await model_cliente.updatePontosCliente( req.user.id, pontos)
                    return res.json({'status':'success'})
                } else{
                    return res.status(400).json({ error: 'Você não tem pontos suficientes' })
                }
            }
            if (req.body.pagamento == 'paypal') {
                const cliente = await model_cliente.getClienteId(req.user.id)
                const data = {
                    pagamento_pendente: 0,
                    forma_pagamento: 'paypal',
                    cliente_id: retorno[0].cliente_id,
                    valor: retorno[0].valor,
                    pontos_retorno: retorno[0].pontos_retorno,
                    pontos_custo: retorno[0].pontos_custo
                }
                
                await model.updateCompras(data, req.params.id)
                const pontos = cliente[0].pontos + retorno[0].pontos_retorno

                
                await model_cliente.updatePontosCliente(req.user.id, pontos)
                return res.json({'status':'success'})
            }

            return res.status(400).json({'error':'Não foi possível realizar o pagamento'})
        } catch (err) {
            return res.status(400).json({ error: err.toString() })
        }
    },
}