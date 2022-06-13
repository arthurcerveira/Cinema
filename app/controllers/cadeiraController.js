const models = require('../models/cadeirasModel');
const sessaoModel = require('./../models/sessaoModel')
const salaModel = require('./../models/salaModel')
const helper = require('../helpers/helper')

module.exports = {
    getCadeirasSessao: async (req, res) => {
        try{

            const cadeiras = await models.getCadeirasSessao(req.params.id)

            const sala_id = await sessaoModel.getSalaDeSessao(req.params.id)
            const sala = await salaModel.getSalaId(sala_id[0].sala_id)
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
    
}