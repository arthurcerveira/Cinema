const models = require('../models/adminModel');
const helper = require('../helper')
module.exports = {
    login: async (req, res) => {
        try {
            const username = req.body.username
            const password = req.body.password
            //TODO: Discuss how to handle logins

            return res.json('wip');
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
        try {
            const admin = await models.getHistorico(req.params.id)
            return res.json(admin);
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },
    addAdmin: async (req, res) => { //procced with caution
        try {
            const admin = await models.createAdmin(req.body.usuario, req.body.senha)
            return res.json(admin);
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },
}
  