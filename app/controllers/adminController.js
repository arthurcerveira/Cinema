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
            return res.json({ error: err });
        }
    },
    /*addAdmin: async (req, res) => { //procced with caution
        try {
            const admin = await models.createAdmin(req.body.usuario, req.body.senha)
            return res.json(admin);
        } catch (err) {
            return res.json({ error: err });
        }
    },*/
    getHistoricoId: async (req, res) => {
        try {
            const admin = await models.getHistorico(req.params.id)
            return res.json(admin);
        } catch (err) {
            return res.json({ error: err });
        }
    },/*
    testeHistorico: async (req, res) => {
        try {
            const adminid = 1
            const log = await helper.createHistorico(adminid, 'inserir', 'filme titulo:morbius. ')
            return res.json(log);
        } catch (err) {
            return res.json({ error: err });
        }
    },*/
}
  