const models = require('../models/filmeModel');
const helper = require('../helper')

module.exports = {
    getFilme: async (req, res) => {
        try {
            const retorno = await models.getFilme(); 
    
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },

    getFilmeId: async (req, res) => {
        try {
            const retorno = await models.getFilmeId(req.params.id); 
    
           return res.json(retorno[0]);
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },

    getTitulo: async (req, res) => {
        try {
            const retorno = await models.getTitulo(req.params.titulo); 
    
           return res.json(retorno);
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },

    createFilme: async (req, res) => {
        try {
            
            const retorno = await models.createFilme(req.body);   
            const filme = req.body
            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "inserir filme - id_filme: "+retorno.insertId, filme)

            return res.json({'Status':'success'});
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },
    
    updateFilme: async (req, res) => {
        try {
            const retorno = await models.updateFilme(req.params.id, req.body); 
            const filme = req.body
            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "atualizar filme - id_filme: "+req.params.id, filme)

            return res.json({'Status':'success'});
        } catch (err) {
            return res.json({ error: err.toString() });
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

            return res.json({'Status':'success'});
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },
}
