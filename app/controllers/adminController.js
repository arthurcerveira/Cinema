const models = require('../models/adminModel');
const helper = require('../helpers/helper')
const { createToken } = require('../helpers/jwt-token')
const { hashPass, compareHash } = require('../helpers/bcrypt')

module.exports = {
    login: async (req, res) => {
        try {
            const { usuario, senha } = req.body
            
            const adm = await models.getUser(usuario)

            if(!adm[0]) return res.status(403).json({'error': 'Usuario ou senha incorretos'})

            if(compareHash(senha, adm[0].senha)){
                const token = createToken({'id': adm[0].id, 'admin': true})
                return res.json({'token': token})
    
            } else{
                return res.status(403).json({'error': 'Usuario ou senha incorretos'})
            }

        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },
    getAll: async (req, res) => {
        try {
            const admin = await models.getAll()
            return res.json(admin);
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },
    
    getHistoricoId: async (req, res) => {
        //pega o histórico pela id do admin
        try {
            if (!req.query.limit && !req.query.offset)
                return res.json(await models.getHistorico(req.params.id))
            else
                return res.json({
                    data: await models.getHistoricoPag(req.params.id, req.query.limit, req.query.offset),
                    limit: parseInt(req.query.limit),
                    total: (await models.getHistoricoCont(req.params.id))[0]["COUNT(*)"]
                })
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },
    addAdmin: async (req, res) => { //procced with caution
        try {
            const { usuario, senha } = req.body 
            const hash = hashPass(senha)

            const admin = await models.createAdmin(usuario, hash)
            return res.json({'status':'success'});
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },
}
  