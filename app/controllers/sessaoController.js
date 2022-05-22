const models = require('../models/sessaoModel')
const helper = require('../helpers/helper')

module.exports = {
    getSessao: async (req, res) => {
        try {
            let retorno 
            if(!req.query.limit && !req.query.offset)
                retorno = await models.getSessao() 
            else retorno = {
                data: await models.getSessaoPag(req.query.limit, req.query.offset),
                limit: parseInt(req.query.limit),
                total: (await models.getSessaoCont())[0]['COUNT(*)']
            }     
            
            return res.json(retorno)
        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },


    getCatalogo: async (req, res) => {
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
    },

    getSessaoId: async (req, res) => {
        try {
            const retorno = await models.getSessaoId(req.params.id) 
    
            return res.json(retorno)
        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },

    createSessao: async (req, res) => {
        try {
            const data = req.body
            data.horario = data.horario.slice(0, 19).replace('T', ' ')

            const retorno = await models.createSessao(data) 
            
            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "criar sessao - id_sessao: "+retorno.insertId, data)

            return res.json({'Status':'success'})
        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },
    
    updateSessao: async (req, res) => {
        try {
            const data = req.body
            data.horario = data.horario.slice(0, 19).replace('T', ' ')

            const retorno = await models.updateSessao(req.params.id, data) 
    
            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "atualizar sessao - id_sessao: "+req.params.id, data)

            return res.json({'Status':'success'})
        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },

    deleteSessao: async (req, res) => {
        try {
            const retorno = await models.deleteSessao(req.params.id) 
    
            /*
            TODO: buscar os dados da sala do banco de dados (sessaoModel) 
            para inserir no local do req.body como histórico
            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "deletar sessao", dadosDaSessaoDeletadaAqui)
            */
            return res.json({'Status':'success'})
        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },
}