const models = require('../models/models');

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
    
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },
    
    updateSala: async (req, res) => {
        try {
            const retorno = await models.updateSala(req.params.id, req.body); 
    
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },

    deleteSala: async (req, res) => {
        try {
            const retorno = await models.deleteSala(); 
    
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },
}
