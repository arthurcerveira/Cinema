const models = require('../models/sessaoModel');
const helper = require('../helper')

module.exports = {
    getSessao: async (req, res) => {
        try {
            const retorno = await models.getSessao(); 
    
            return res.json(retorno);
        } catch (err) {
            console.log(err)
            return res.json({ error: err });
        }
    },

    getSessaoId: async (req, res) => {
        try {
            const retorno = await models.getSessaoId(req.params.id); 
    
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },

    createSessao: async (req, res) => {
        try {
            const data = req.body
            data.horario = data.horario.slice(0, 19).replace('T', ' ')

            const retorno = await models.createSessao(data); 
            
            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "criar sessao - id_sessao: "+retorno.insertId, data)

            return res.json(retorno);
        } catch (err) {
            console.log(err)
            return res.json({ error: err });
        }
    },
    
    updateSessao: async (req, res) => {
        try {
            const data = req.body
            data.horario = data.horario.slice(0, 19).replace('T', ' ')

            const retorno = await models.updateSessao(req.params.id, data); 
    
            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "atualizar sessao - id_sessao: "+req.params.id, data)

            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },

    deleteSessao: async (req, res) => {
        try {
            const retorno = await models.deleteSessao(req.params.id); 
    
            /*
            TODO: buscar os dados da sala do banco de dados (sessaoModel) 
            para inserir no local do req.body como histórico


            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "deletar sessao", dadosDaSessaoDeletadaAqui)
            */
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },
}
