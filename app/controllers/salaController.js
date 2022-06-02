const models = require('../models/salaModel');
const helper = require('../helpers/helper');
const cadeirasSalasModel = require('../models/cadeirasSalasModel');

module.exports = {
    getSala: async (req, res) => {
        try {
            if(!req.query.limit && !req.query.offset){
                res.json(await models.getSala())
            }                 
            res.json({
                data: await models.getSalaPag(req.query.limit, req.query.offset),
                limit: parseInt(req.query.limit),
                total: (await models.getSalaCont())[0]['COUNT(*)']
            })

        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },

    getSalaId: async (req, res) => {
        try {
            const retorno = await models.getSalaId(req.params.id); 
    
            return res.json(retorno[0]);
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },


    createSala: async (req, res) => {
        try {
            const retorno = await models.createSala(req.body); 
            const {colunas, filas} = req.body


            //para cada coluna e fila é criado uma cadeira
            for(let i = 0; i < filas; i++){
                for(let j = 0; j < colunas; j++){
                    const cadeirasSalas = {
                        sala_id: retorno.insertId,
                        coluna: j+1,
                        fila: i+1,
                        status: 1
                    }

                    await cadeirasSalasModel.createCadeirasSalas(cadeirasSalas)
                }
            }


            const adminid = req.user.id;
            if (!isNaN(adminid))
                await helper.createHistorico(adminid, "criar sala - id sala: "+retorno.insertId, req.body)

            return res.json({'status':'success'});
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },
    
    updateSala: async (req, res) => {
        try {
            const retorno = await models.updateSala(req.params.id, req.body); 
    
            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "atualizar sala - id sala: "+req.params.id, req.body)

            return res.json({'status':'success'});
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },

    deleteSala: async (req, res) => {
        try {
            const retorno = await models.getSalaId(req.params.id)
            await models.deleteSala(req.params.id); 

            const adminid = parseInt(req.header('adminid'))
            if(!isNaN(adminid))
                await helper.createHistorico(adminid, "deletar sala - id sala"+req.params.id, retorno[0])

            return res.json({'status':'success'});
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },

    getSalaByNumero: async (req, res) => {
        try {
            const retorno = await models.getSalaByNumero(req.params.numero); 
    
            return res.json(retorno[0]);
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    }
}
