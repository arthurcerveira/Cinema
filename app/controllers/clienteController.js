const models = require('../models/clienteModel');
// const helper = require('../helper')

module.exports = {
    getCliente: async (req, res) => {
        try {
            const retorno = await models.getCliente(); 
    
            return res.json(retorno);
        } catch (err) {
            console.log(err)
            return res.json({ error: err });
        }
    },

    getClienteId: async (req, res) => {
        try {
            const retorno = await models.getClienteId(req.params.id); 
    
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },

    createCliente: async (req, res) => {
        try {
            const data = req.body;

            const retorno = await models.createCliente(data); 

            return res.json(retorno);
        } catch (err) {
            console.log(err)
            return res.json({ error: err });
        }
    },
    
    updateCliente: async (req, res) => {
        try {
            const data = req.body
            const retorno = await models.updateCliente(req.params.id, data); 

            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },

    deleteCliente: async (req, res) => {
        try {
            const retorno = await models.deleteCliente(req.params.id); 
    
            return res.json(retorno);
        } catch (err) {
            return res.json({ error: err });
        }
    },
}
