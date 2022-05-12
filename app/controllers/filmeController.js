const models = require('../models/filmeModel');
const helper = require('../helper')

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
            
            const data = req.body
            const retorno = await models.createFilme(data);   
            
            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "inserir filme", data)

            return res.json(retorno);
        } catch (err) {
            console.log(err)
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
            const retorno = await models.deleteFilme(req.params.id); 
    
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },
}
