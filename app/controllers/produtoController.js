const models = require('../models/produtoModel')
const helper = require('../helpers/helper')
const env = require('dotenv')

env.config()

module.exports = {
    getProduto: async (req, res) => {
        try {
            let queryComposer = 'ORDER BY nome ASC '
      /*      if(req.query.data){
                //usando queryComposer da mesma forma que no filme,
                //pra seleção por datas
                const data1 = new Date(req.query.data)
                const data2  = new Date(parseInt(Date.parse(data1)) + 86400000)

                const dataFormatado = data1.toISOString().slice(0, 19).replace('T', ' ').replaceAll('/', '-')
                const dataFormatado2 = data2.toISOString().slice(0, 19).replace('T', ' ').replaceAll('/', '-')

                queryComposer = `WHERE horario >="${dataFormatado}" AND horario < "${dataFormatado2}"`
            }*/

            if(req.query.orderBy=='min')
                queryComposer = 'ORDER BY valor ASC '
            
            if(req.query.orderBy=='max')
                queryComposer = 'ORDER BY valor DESC '
            


            if(!req.query.limit && !req.query.offset)
                return res.json(await models.getProduto(queryComposer))
            
   
                
            return res.json({
            data: await models.getProdutoPag(req.query.limit, req.query.offset, queryComposer),
            limit: parseInt(req.query.limit),
            total: (await models.getProdutoCont(queryComposer))[0]['COUNT(*)']})
            
            
        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },

    /*getCatalogo: async (req, res) => {
        try {
            //EU ODEIO DATAS DO FUNDO DO MEU CORAÇÃO
            const hoje = new Date()

            const hojeNovo = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), hoje.getHours() - 3, 59, 58)
            const hojeFormatado = hojeNovo.toISOString().slice(0, 19).replace('T', ' ').replaceAll('/', '-')


            const nextWeek = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 7, 20, 59, 58)
            const nextWeekFormatado = nextWeek.toISOString().slice(0, 19).replace('T', ' ').replaceAll('/', '-')

            const retorno = await models.getCatalogo(hojeFormatado, nextWeekFormatado) 
    
            return res.json(retorno)
        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },*/

    getProdutoId: async (req, res) => {
        try {
            const retorno = await models.getProdutoId(req.params.id) 
    
            return res.json(retorno[0])
        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },

    createProduto: async (req, res) => {
        try {
            const data = req.body

            const retorno = await models.createProduto(data) 
            retorno.insertId

            const adminid = req.user.id;
            if (!isNaN(adminid))
                await helper.createHistorico(adminid, "criar produto - id produto: "+retorno.insertId, data)

            return res.json({'status':'success'})
        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },
    
    updateProduto: async (req, res) => {
        try {
            const data = req.body

            const retorno = await models.updateProduto(req.params.id, data) 
            
            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "atualizar produto - id_produto: "+req.params.id, data)

            return res.json({'status':'success'})
        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },

    deleteProduto: async (req, res) => {
        try {
            const retorno = await models.getProdutoId(req.params.id) 
            await models.deleteProduto(req.params.id) 
    
            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "deletar produto - id_produto: "+req.params.id, retorno[0])
            return res.json({'status':'success'})
        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },

    getIngresso: async (req, res) => {
        try {
            const retorno = await models.getProdutoId(process.env.INGRESSO_ID) 
    
            return res.json(retorno[0])
        } catch (err) {
            return res.status(400).json({ error: err.toString() })
        }
    }
}