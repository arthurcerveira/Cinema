const models = require('../models/cadeirasSalasModel');
const salaModel = require('./../models/salaModel')
const helper = require('../helpers/helper')

module.exports = {
    getCadeirasSalas: async (req, res) => {
        try{
            const cadeiras = await models.getCadeirasSalas(req.params.id)
            const sala = await salaModel.getSalaId(req.params.id)

            const matrix = []
            let k = -1
            for(let i = 0; i < cadeiras.length; i++){
                if (i % sala[0].colunas === 0){
                    k++
                    matrix[k] = []
                }
                matrix[k].push(cadeiras[i])
            }


            return res.json(matrix)
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