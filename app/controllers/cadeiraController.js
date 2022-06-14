const models = require('../models/cadeirasModel');
const sessaoModel = require('./../models/sessaoModel')
const filmeModel = require('../models/filmeModel')
const salaModel = require('./../models/salaModel')
const helper = require('../helpers/helper')

module.exports = {
    getCadeirasSessao: async (req, res) => {
        try{

            const cadeiras = await models.getCadeirasSessao(req.params.id)

            
            const sessaoData = await sessaoModel.getSessaoId(req.params.id)

            const sala = await salaModel.getSalaId(sessaoData[0].sala_id)
            const matrix = []
            let k = -1
            for(let i = 0; i < cadeiras.length; i++){
                if (i % sala[0].colunas === 0){
                    k++
                    matrix[k] = []
                }
                matrix[k].push(cadeiras[i])
            }

            const retorno = {
                cadeiras: matrix,
                sessao: sessaoData[0]
            }

            return res.json(retorno)
        }
        catch (err) {
            return res.json({ error: err.toString() });
        }
    },
    
}