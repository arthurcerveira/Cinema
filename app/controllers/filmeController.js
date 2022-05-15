const models = require('../models/filmeModel');
const helper = require('../helpers/helper')

module.exports = {
    getFilme: async (req, res) => {
        try {
            const adminid = req.header('adminid')
            const retorno = await models.getFilme(); 
    
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },

    getFilmeId: async (req, res) => {
        try {
            const retorno = await models.getFilmeId(req.params.id); 
    
           return res.json(retorno[0]);
        } catch (err) {
            return res.json({ error: err });
        }
    },

    createFilme: async (req, res) => {
        try {
            
            const retorno = await models.createFilme(req.body);   
            
            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "inserir filme", req.body)

            return res.json(retorno);
        } catch (err) {
            console.log(err)
            return res.json({ error: err });
        }
    },
    
    updateFilme: async (req, res) => {
        try {
            const retorno = await models.updateFilme(req.params.id, req.body); 

            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "atualizar filme", req.body)

            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },

    deleteFilme: async (req, res) => {
        try {
            const retorno = await models.deleteFilme(req.params.id); 
    
            /*
            TODO: buscar os dados do filme do banco de dados (filmeModel) 
            para inserir no local do req.body como histórico


            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "deletar filme", dadosDoFilmeDeletadoAqui)
            */

            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },
}
