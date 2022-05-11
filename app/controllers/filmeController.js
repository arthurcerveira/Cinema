const models = require('../models/models');

module.exports = {
    getFilme: async (req, res) => {
        try {
            const retorno = await models.getFilme(); 
    
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },

    getFilmeId: async (req, res) => {
        try {
            const retorno = await models.getFilmeId(req.params.id); 
    
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },

    createFilme: async (req, res) => {
        try {
            const retorno = await models.createFilme(req.body); 
    
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },
    
    updateFilme: async (req, res) => {
        try {
            const retorno = await models.updateFilme(req.params.id, req.body); 
    
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },

    deleteFilme: async (req, res) => {
        try {
            const retorno = await models.deleteFilme(); 
    
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },
}
