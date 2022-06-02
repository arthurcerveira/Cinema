const models = require('../models/cadeirasSalasModel');
const helper = require('../helpers/helper')

module.exports = {
    getCadeirasSalas: async (req, res) => {
        try{
            const salas = await models.getCadeirasSalas(req.params.id)
            return res.json(salas)
        }
        catch (err) {
            return res.json({ error: err.toString() });
        }
    },

    deleteCadeirasSalas: async (req, res) => {
        try{
            const salas = await models.deleteCadeirasSalas(req.params.id);
            return res.json({'status':'success'});
        }
        catch (err) {
            return res.json({ error: err.toString() });
        }
    },

    updateCadeirasSalas: async (req, res) => {
        try{
            const salas = await models.updateCadeirasSalas(req.params.id, req.body);
            return res.json({'status':'success'});
        }
        catch (err) {
            return res.json({ error: err.toString() });
        }
    },



}