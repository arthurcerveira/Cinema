const models = require('../models/sessaoModel')
const cadeiraSalaModel = require('../models/cadeirasSalasModel')
const salaModel = require('../models/salaModel')
const helper = require('../helpers/helper')
const cadeirasModel = require('../models/cadeirasModel')

module.exports = {
    getSessao: async (req, res) => {
        try {
            let queryComposer = ''
            if(req.query.data){
                //usando queryComposer da mesma forma que no filme,
                //pra seleção por datas
                const data1 = new Date(req.query.data)
                const data2  = new Date(parseInt(Date.parse(data1)) + 86400000)

                const dataFormatado = data1.toISOString().slice(0, 19).replace('T', ' ').replaceAll('/', '-')
                const dataFormatado2 = data2.toISOString().slice(0, 19).replace('T', ' ').replaceAll('/', '-')

                queryComposer = `WHERE horario >="${dataFormatado}" AND horario < "${dataFormatado2}"`
            }

            if(req.query.filme){
                if(queryComposer == '')
                    queryComposer = `WHERE filme_id=${req.query.filme}`
                else queryComposer += `AND filme_id=${req.query.filme}`
            }
            if(!req.query.limit && !req.query.offset)
                return res.json(await models.getSessao(queryComposer))
            else 
                return res.json({
                data: await models.getSessaoPag(req.query.limit, req.query.offset, queryComposer),
                limit: parseInt(req.query.limit),
                total: (await models.getSessaoCont(queryComposer))[0]['COUNT(*)']
            })
            
        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },
    getHorariosFilme: async (req, res) => {
        try {
            const sessoes = await models.getSessaoFilme(req.params.id)
            const map = new Map()
            
            for(let i = 0; i< sessoes.length; i++){
                const dataHora = sessoes[i].horario.split(' ')
                if(map.has(dataHora[0]))
                    map.get(dataHora[0]).push({
                        id: sessoes[i].id,
                        hora: dataHora[1]
                    })
                else map.set(dataHora[0], [{ 
                    id: sessoes[i].id,
                    hora: dataHora[1]
                }])
            }
            
            const json = Object.fromEntries(map)
            return res.json(json)
        } catch (err) {
            return res.status(403).json({ error: err.toString() })
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
    
            return res.json(retorno[0])
        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },

    createSessao: async (req, res) => {
        try {
            const data = req.body
            data.horario = data.horario.slice(0, 19).replace('T', ' ')
            const retorno = await models.createSessao(data) 
            
            const adminid = req.user.id;
            if (!isNaN(adminid))
                await helper.createHistorico(adminid, "criar sessao - id sessao: "+retorno.insertId, data)
            
            const result = await cadeiraSalaModel.getCadeirasSalas(req.body.sala_id)

            const sala = await salaModel.getSalaId(req.body.sala_id)

            let numeroCount = 1
            let columnMax = 1
            const allCadeiras = []
            for(let i = 0; i < result.length; i++){
                if(numeroCount > sala[0].colunas || columnMax > sala[0].colunas){
                    numeroCount = 1
                    columnMax = 1
                }
                const cadeiraObj = {
                    status: result[i].status,
                    fila: result[i].fila,
                    coluna: result[i].coluna,
                    sessao_id: retorno.insertId
                }
                if(result[i].status == 0)
                    cadeiraObj.numero = -1
                else{
                    cadeiraObj.numero = numeroCount
                    numeroCount++
                }
                columnMax++
                allCadeiras.push(cadeiraObj)
                //const char = await cadeirasModel.createCadeiras(cadeiraObj)
            }
            await cadeirasModel.createAllCadeiras(allCadeiras)
            return res.json({'status':'success'})
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

            return res.json({'status':'success'})
        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },

    deleteSessao: async (req, res) => {
        try {
            const retorno = await models.getSessaoId(req.params.id) 
            await models.deleteSessao(req.params.id) 
    
            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "deletar sessao - id_sessao: "+req.params.id, retorno[0])
            return res.json({'status':'success'})
        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },
}