const models = require('../models/salaModel');
const helper = require('../helper')

module.exports = {
    getSala: async (req, res) => {
        try {
            const retorno = await models.getSala(); 
    
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },

    getSalaId: async (req, res) => {
        try {
            const retorno = await models.getSalaId(req.params.id); 
    
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },

    createSala: async (req, res) => {
        try {
            const retorno = await models.createSala(req.body); 
            const sala = req.body
            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "criar sala - id_sala: "+retorno.insertId, sala)

            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },
    
    updateSala: async (req, res) => {
        try {
            const retorno = await models.updateSala(req.params.id, req.body); 
            const sala = req.body
            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "atualizar sala - id_sala: "+req.params.id, sala)

            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },

    deleteSala: async (req, res) => {
        try {
            const retorno = await models.deleteSala(req.params.id); 
    
            /*
            TODO: buscar os dados da sala do banco de dados (salaModel) 
            para inserir no local do req.body como histórico


            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "deletar sala", dadosDaSalaDeletadaAqui)
            */
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },
}
